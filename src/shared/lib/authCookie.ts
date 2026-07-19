import { deleteCookie, hasCookie, setCookie } from 'cookies-next/client'

import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  XSRF_TOKEN_COOKIE_NAME,
} from './constants'
import { env } from './env'

// 認証 marker cookie の操作ヘルパー (クライアント側専用)。
// HttpOnly な Sanctum セッション Cookie はログイン失敗や CSRF 取得でも付与されてしまい
// 認証判定に使えないため、フロント側で作成・削除可能な marker cookie を分離する。
// middleware と axios interceptor の両方から参照される。
// cookies-next/client は SSR 描画時に no-op になるため typeof document ガードは不要

// ログイン成功時にセットする。値は固定 '1' (存在判定のみで認証 token 等は持たせない)。
// HttpOnly は付与不可 (フロントで削除する必要があるため) / SameSite=Lax / 本番のみ Secure
export const setAuthCookie = (): void => {
  setCookie(env.NEXT_PUBLIC_AUTH_COOKIE_NAME, '1', {
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    // 本番 (https) のみ Secure。SSR では window 不在のため false (cookies-next が no-op なので評価されても無害)
    secure:
      typeof window !== 'undefined' && window.location.protocol === 'https:',
  })
}

// 認証 marker cookie の存在チェック (クライアント側専用・軽量判定)。
// useUser を呼べない CC (ErrorScreen 等) で「戻るボタンのフォールバック先を home / login で切り替える」用途に使う。
// SSR では cookies-next が false を返す
export const hasAuthCookie = (): boolean =>
  hasCookie(env.NEXT_PUBLIC_AUTH_COOKIE_NAME)

// 認証切れ・ログアウト時にフロント側で削除可能な Cookie を一括クリアする。
// HttpOnly な Sanctum セッション Cookie は middleware の Response 経由 (Set-Cookie ヘッダ) と
// BE 側の logout / 401 レスポンスで削除される (二重防衛)
export const clearAuthArtifacts = (): void => {
  deleteCookie(env.NEXT_PUBLIC_AUTH_COOKIE_NAME, { path: '/' })
  deleteCookie(XSRF_TOKEN_COOKIE_NAME, { path: '/' })
}
