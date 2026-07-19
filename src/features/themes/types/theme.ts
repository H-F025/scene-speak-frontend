import type { EnglishLevel } from '../schemas/englishLevel'

// GET /api/v1/themes の themes[] 要素。
// english_level_label はバックエンドフォーマット済み (初級 / 中級 / 上級) のためそのまま表示する
// (CLAUDE.md「バックエンド message / label を SSoT」原則を表示文言にも適用)
// estimated_minutes は null の場合「制限なし」として表示するためフロント側で整形する
//
// id (Theme PK) はアイコン / 背景色マッピング (themeAppearance) のキーとして使用する。
// theme_level_id (ThemeLevel PK = テーマ × 英語レベルの組合せ PK) は問題一覧 API
// (/themes/{theme_level_id}/questions) の path 引数として使用する。
// 両者は別シーケンスのため、用途に応じて使い分ける必要がある
export interface Theme {
  id: number
  theme_level_id: number
  title: string
  description: string
  english_level: EnglishLevel
  english_level_label: string
  estimated_minutes: number | null
}

// GET /api/v1/themes 200 レスポンス
export interface ThemesResponse {
  themes: Theme[]
}
