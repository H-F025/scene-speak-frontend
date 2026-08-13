// お問い合わせ送信成功時のレスポンス body
export type ContactResponse = {
  message: string
}

// 429 (レート制限) 時のレスポンス body。message をそのまま root エラーとして表示する
export type ContactErrorResponse = {
  message: string
}
