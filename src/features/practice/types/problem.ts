// 通常問題 (05_ProblemScreen) で扱う問題詳細の型。
// GET /learning-sessions/{learning_session_id}/questions/{question_id} のレスポンスを表現する。
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

// 進捗バー / 「問題 N / 合計」 / 「Nクリア済み」表示の元データ。
// BE が completed_question_count / progress_percentage 等を算出するため FE で再計算しない
export interface QuestionProgress {
  current_question_number: number
  total_question_count: number
  completed_question_count: number
  remaining_question_count: number
}

// GET /learning-sessions/{learning_session_id}/questions/{question_id} 200 レスポンス
export interface ThemeQuestionResponse {
  progress: QuestionProgress
  question: QuestionDetail
}

// POST /learning-sessions/{learning_session_id}/questions/{question_id}/answer (200 OK)
// 正誤判定結果は含まれず、後続の 06_Feedback 画面で question_attempt_id を使って取得する
export interface SubmitAnswerResponse {
  question_attempt_id: number
}
