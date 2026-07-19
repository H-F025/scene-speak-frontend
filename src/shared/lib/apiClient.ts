import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { clearAuthArtifacts } from './authCookie'
import {
  API_TIMEOUT_MS,
  AUTH_LOGIN_PATH,
  HTTP_STATUS,
  ROUTES,
  STATE_CHANGING_HTTP_METHODS,
} from './constants'
import { env } from './env'
import { fetchCsrfCookie, resetCsrfState } from './sanctumCsrf'

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

// Laravel Sanctum SPA 認証: Cookie ベース + XSRF-TOKEN を自動付与
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: API_TIMEOUT_MS,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase()
  // POST/PUT/PATCH/DELETE 等の状態変更系メソッドは CSRF Cookie の事前取得が必須
  const isStateChangingMethod =
    method !== undefined &&
    (STATE_CHANGING_HTTP_METHODS as readonly string[]).includes(method)

  if (isStateChangingMethod) await fetchCsrfCookie()

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableRequestConfig | undefined
    // 419 (CSRF トークン期限切れ) が返り、かつ未リトライのリクエストのみ Cookie を再取得して1度だけリトライ
    const isCsrfMismatchError =
      error.response?.status === HTTP_STATUS.CSRF_TOKEN_MISMATCH &&
      original &&
      !original._retry

    if (isCsrfMismatchError) {
      original._retry = true
      resetCsrfState()
      await fetchCsrfCookie()
      return apiClient(original)
    }

    // 401 (セッション切れ) はログインAPI を除き /login へフルリロード遷移。
    // ログインAPI の 401 (資格情報不正) はフォーム側で表示するため握りつぶさない。
    // 既に /login にいる場合は無限リダイレクトを避けるため遷移しない。
    // フルリロードにより in-memory state / TanStack Query キャッシュも併せてクリアされる
    const isUnauthorized = error.response?.status === HTTP_STATUS.UNAUTHORIZED
    const isLoginRequest = original?.url?.endsWith(AUTH_LOGIN_PATH) ?? false

    if (
      isUnauthorized &&
      !isLoginRequest &&
      typeof window !== 'undefined' &&
      window.location.pathname !== ROUTES.LOGIN
    ) {
      // marker cookie と XSRF-TOKEN をフロント側で削除 (Sanctum セッションは BE が 401 レスポンスで破棄前提)。
      // 削除しないと middleware が marker cookie を見て /home へ再 redirect するループが発生する
      clearAuthArtifacts()
      window.location.href = ROUTES.LOGIN
    }

    // 422/5xx 等は握りつぶさず TanStack Query / UI 層へ委譲する
    return Promise.reject(error)
  },
)
