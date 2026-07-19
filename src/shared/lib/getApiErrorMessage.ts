import { isAxiosError } from 'axios'

// バックエンドは全エラーレスポンスで `message` フィールドに
// ユーザー向けの日本語文言を返す方針で統一されているため、
// それを Single Source of Truth として表示する。
// response が無い (ネットワーク断 / タイムアウト等) の場合のみフォールバック文言を使う
// `\n` は表示側で `whitespace-pre-line` を当てて改行表示する
const NETWORK_ERROR_FALLBACK_MESSAGE =
  '通信エラーが発生しました。\nしばらくしてから再度お試しください。'

interface ApiErrorPayload {
  message?: string
}

// API クライアント由来のエラーから、画面表示用メッセージを取り出す。
// `apiErrorToast` (トースト表示) と `ErrorScreen` (Error Boundary fallback) の両方で利用する
export const getApiErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const payload = error.response?.data as ApiErrorPayload | undefined
    return payload?.message ?? NETWORK_ERROR_FALLBACK_MESSAGE
  }
  return NETWORK_ERROR_FALLBACK_MESSAGE
}

// AxiosError から HTTP ステータスコードを取り出す。
// レスポンスが無い (ネットワーク断 / タイムアウト等) や AxiosError でないエラーは null を返す。
// ErrorScreen の見出しに `${status} エラー` 形式で表示する用途を想定
export const getApiErrorStatus = (error: unknown): number | null => {
  if (isAxiosError(error)) {
    return error.response?.status ?? null
  }
  return null
}
