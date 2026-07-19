// アプリ横断の API 基盤設定。feature 固有のエンドポイントパスは
// 各 features/<f>/constants/endpoints.ts に閉じる (Bulletproof React 準拠)

// バックエンド API のバージョン付き base URL。
// feature 側 endpoints は `${API_BASE_URL}/<resource>` 形式で組み立てる
export const API_BASE_URL = '/api/v1'

// Laravel Sanctum SPA 認証の CSRF Cookie 取得エンドポイント。
// feature ではなく axios クライアント基盤の関心事のため shared に保持する
export const SANCTUM_CSRF_COOKIE_PATH = '/sanctum/csrf-cookie'

// 例外: apiClient interceptor が「ログインAPIの 401 は資格情報不正なので
// /login へリダイレクトしない」判定で参照する cross-cutting 定数。
// feature 側 (AUTH_ENDPOINTS.LOGIN) はこの定数を import して同期させる。
// 通常の feature 固有エンドポイントは shared に置かず features/<f>/constants/endpoints.ts に閉じる
export const AUTH_LOGIN_PATH = `${API_BASE_URL}/auth/login`
