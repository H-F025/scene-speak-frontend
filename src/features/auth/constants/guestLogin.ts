// ゲストログイン用の固定デモアカウント。/login と同一の認証 API に送信する。
// アカウント作成なしで即座にサービスを試せる導線 (TOP ページ) 専用
export const GUEST_LOGIN_CREDENTIALS = {
  email: 'guest@example.com',
  password: 'QymBqPG6',
} as const
