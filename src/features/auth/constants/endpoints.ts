import { API_BASE_URL, AUTH_LOGIN_PATH } from '@/shared/lib/constants'

// auth feature が呼び出すバックエンドエンドポイント (一次情報源)。
// 複数エンドポイントを持つため <FEATURE>_ENDPOINTS オブジェクト形式で集約する。
// LOGIN は apiClient interceptor が 401 例外処理で参照するため shared の AUTH_LOGIN_PATH と同期する
export const AUTH_ENDPOINTS = {
  LOGIN: AUTH_LOGIN_PATH,
  REGISTER: `${API_BASE_URL}/auth/register`,
  ME: `${API_BASE_URL}/auth/me`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
} as const
