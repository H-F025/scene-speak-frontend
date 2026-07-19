// API クライアント (axios) のリクエストタイムアウト
export const API_TIMEOUT_MS = 10_000

// バックエンド関連で扱うステータスコード
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  CSRF_TOKEN_MISMATCH: 419,
  UNPROCESSABLE_ENTITY: 422,
} as const

// バックエンド関連で扱う状態変更系メソッド
export const STATE_CHANGING_HTTP_METHODS = [
  'post',
  'put',
  'patch',
  'delete',
] as const
