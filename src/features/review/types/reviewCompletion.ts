// 復習完了画面 (07_ReviewComplete) のレスポンス型。
// reviewed_categories は最大 2 件で確定し、3 件以上は reviewed_category_count >= 3 で判定する
// (BE 設計: pointCard 本文の「{a}、{b}などを中心に〜」分岐に必要)。

export type NextRecommendationType =
  | 'review_skipped' // スキップ件数 >= 1
  | 'review_remaining' // 復習問題がまだ残る
  | 'review_completed' // 復習対象が残っていない

export interface ReviewCompletionResponse {
  result: {
    total_question_count: number
    correct_count: number
  }
  reviewed_categories: string[]
  reviewed_category_count: number
  next_recommendation_type: NextRecommendationType
}
