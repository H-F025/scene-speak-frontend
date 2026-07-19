// 認証関連の Cookie 操作で使う固定定数。
// middleware (Edge Runtime) と axios interceptor (CSR) の双方から参照されるため shared に集約

// Laravel が発行する CSRF Cookie 名 (固定)。Sanctum SPA 認証の token として axios が自動付与する。
// 認証失敗時にフロント (clearAuthArtifacts) と middleware (clearAuthCookies) の両方で削除対象になる
export const XSRF_TOKEN_COOKIE_NAME = 'XSRF-TOKEN'

// marker cookie (NEXT_PUBLIC_AUTH_COOKIE_NAME) の有効期限 (秒)。
// BE の Sanctum セッション lifetime (config/session.php / SESSION_LIFETIME=120 分) と同期させる
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 120
