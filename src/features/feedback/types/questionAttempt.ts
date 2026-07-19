// 通常問題フィードバック (06_Feedback_*) で扱う question_attempt の型。
// GET /question-attempts/{question_attempt_id} のレスポンスを表現する。
// 表示文言 (explanation 等) は BE が一次情報源のため FE で固定文言を持たない
// (CLAUDE.md「バックエンドの message を SSoT」原則)

export interface QuestionAttemptChoice {
  id: number
  content: string
}

export interface QuestionAttemptResult {
  is_correct: boolean
  selected_choice: QuestionAttemptChoice
  correct_choice: QuestionAttemptChoice
  explanation: string
}

// GET /question-attempts/{question_attempt_id} 200 レスポンス。
// next_question_id が null の場合はテーマ内に次の問題がない (= 問題一覧へ戻る)
export interface QuestionAttemptResponse {
  question_attempt_id: number
  learning_session_id: number
  next_question_id: number | null
  result: QuestionAttemptResult
}
