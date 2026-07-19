// 英語学習レベル。バックエンドの english_level (code 文字列) と1対1対応する。
export const ENGLISH_LEVEL = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const

// 表示用ラベル。バックエンドで日本語化済みの値 (english_level_label) と一致させる。
// フロントでは i18n 変換しないが、型の SSOT として定数化しておく
export const ENGLISH_LEVEL_LABEL = {
  BEGINNER: '初級',
  INTERMEDIATE: '中級',
  ADVANCED: '上級',
} as const

// バックエンド english_levels テーブルの id。POST /register の english_level として送信する値。
// マスタ取得 API (GET /api/v1/english-levels) を本画面では叩かない方針のため、フロントで固定値を持つ。
// ENGLISH_LEVEL_OPTIONS から間接的に参照されるため module スコープに残すが、外部 export はしない (YAGNI)
const ENGLISH_LEVEL_ID = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
} as const

// EnglishLevelToggle が直接 map する表示用オプション。
// id (POST 時に送る値) と label (UI 表示) を組にして並び順を固定する
export const ENGLISH_LEVEL_OPTIONS = [
  { id: ENGLISH_LEVEL_ID.BEGINNER, label: ENGLISH_LEVEL_LABEL.BEGINNER },
  {
    id: ENGLISH_LEVEL_ID.INTERMEDIATE,
    label: ENGLISH_LEVEL_LABEL.INTERMEDIATE,
  },
  { id: ENGLISH_LEVEL_ID.ADVANCED, label: ENGLISH_LEVEL_LABEL.ADVANCED },
] as const
