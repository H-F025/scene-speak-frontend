// GET /api/v1/themes/{theme_id}/questions の 200 レスポンス型。
// english_level_label / progress_percentage / completed_question_count はバックエンド計算済みの値を
// そのまま表示する (CLAUDE.md「バックエンドの message / label を SSoT」原則を表示文言にも適用)。
// 進捗キャッシュは BE 側 (theme_learning_progresses) が一次情報源のため FE 側で再計算しない

export type EnglishLevel = 'beginner' | 'intermediate' | 'advanced'

export interface ThemeSummary {
  id: number
  title: string
  english_level: EnglishLevel
  english_level_label: string
  total_question_count: number
  completed_question_count: number
  progress_percentage: number
}

export interface QuestionListItem {
  id: number
  number: number
  title: string
  is_completed: boolean
}

export interface ThemeQuestionsResponse {
  theme: ThemeSummary
  questions: QuestionListItem[]
}
