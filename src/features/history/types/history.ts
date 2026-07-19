// GET /api/v1/histories のレスポンス型。
// learned_on / study_time / summary / total_study_time は BE 側でフォーマット済み文字列で返るため、
// FE は日付ライブラリ不要でそのまま表示する (spec 既知の制約)

// 履歴種別。CategoryBadge の色分岐 (会話練習 / 復習) はこの discriminator で行う
export type HistoryType = 'normal' | 'review'

// 全期間統計 (year_month 指定有無に関わらず全期間値が返る)。
// 月切替時も値は変わらない想定 (spec 受け入れ条件: 統計は全期間値を保持)
export interface HistoryStudySummary {
  streak_days: number
  conversation_count: number
  total_study_time: string
}

export interface HistoryItem {
  history_type: HistoryType
  type_label: '会話練習' | '復習'
  title: string
  learned_on: string
  study_time: string
  summary: string
}

export interface HistoryGroup {
  // BE 整形済みの月見出し文字列 (例「2025年5月」)。リクエストの year_month クエリ (YYYY-MM) とは別形式
  year_month: string
  histories: HistoryItem[]
}

export interface HistoryMeta {
  current_page: number
  per_page: number
  last_page: number
}

export interface HistoryResponse {
  study_summary: HistoryStudySummary
  history_groups: HistoryGroup[]
  meta: HistoryMeta
}
