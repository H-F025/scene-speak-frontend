// 英語レベルのマスタ option。GET /api/v1/english-levels が sort_order 昇順で返す。
// code は users.english_level (code 文字列) と同定するためのキー。
// BE 設計が id に意味を持たせない方針のため、現在レベルの突き合わせは code を基準にする。
// 更新リクエストには id を送る (code→id 変換が必要)
export interface EnglishLevelOption {
  id: number
  code: 'beginner' | 'intermediate' | 'advanced'
  name: string
  description: string
  example_sentence: string
  sort_order: number
}

// GET /api/v1/english-levels 200 レスポンス
export interface EnglishLevelsResponse {
  english_levels: EnglishLevelOption[]
}

// PATCH /api/v1/me/english-level リクエスト。変更後の english_levels.id を送る (必須)
export interface UpdateEnglishLevelRequest {
  id: number
}

// PATCH /api/v1/me/english-level 200 レスポンス
export interface UpdateEnglishLevelResponse {
  message: string
}
