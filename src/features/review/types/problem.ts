// 復習問題 (05_ReviewProblemScreen) で扱う問題詳細の型。
// GET /review-sets/{review_set_id}/questions/{review_set_question_id} のレスポンスを表現する。
// hint / title 等の表示文言は BE が一次情報源のため FE で固定文言を持たない
// (CLAUDE.md「バックエンドの message を SSoT」原則)

export interface QuestionChoice {
  id: number
  content: string
}

export interface QuestionDetail {
  id: number
  title: string
  scene_label: string
  partner_message: string
  instruction: string
  question_text: string
  hint: string
  choices: QuestionChoice[]
}

// 進捗バー / 「復習問題 N / 合計」表示の元データ
export interface QuestionProgress {
  current_question_number: number
  total_question_count: number
  completed_question_count: number
  remaining_question_count: number
}

// GET /review-sets/{review_set_id}/questions/{review_set_question_id} 200 レスポンス。
// 通常問題との差分は review_set_id / category_name (画面上部「復習ポイント」表示) のみ
export interface ReviewQuestionResponse {
  review_set_id: number
  category_name: string
  progress: QuestionProgress
  question: QuestionDetail
}

// POST /review-sets/{review_set_id}/questions/{review_set_question_id}/answer (201 Created)
// 正誤判定結果は含まれず、後続の 06_Feedback 画面で question_attempt_id を使って取得する
export interface SubmitAnswerResponse {
  question_attempt_id: number
}
