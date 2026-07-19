// 学習セッションのライフサイクル (開始 / heartbeat / 終了) で扱う型。
// 05_ProblemScreen / 06_Feedback / 07_ReviewComplete などで横断的に利用する想定

export type LearningSessionType = 'normal' | 'review'

// POST /api/v1/learning-sessions リクエスト。
// learning_type で「通常 / 復習」を区別し、learning_target_id には
// normal の場合 theme_level_id / review の場合 review_set_id を入れる (BE 仕様)
export type StartLearningSessionRequest =
  | { learning_type: 'normal'; learning_target_id: number }
  | { learning_type: 'review'; learning_target_id: number }

// POST /api/v1/learning-sessions 201 レスポンス
export interface StartLearningSessionResponse {
  learning_session_id: number
}

// POST /api/v1/learning-sessions/{learning_session_id}/heartbeat 200 レスポンス
export interface HeartbeatLearningSessionResponse {
  learning_session_id: number
}

// 学習セッションの終了理由。
// completed: 「次の会話を始める」 / 復習完了
// abandoned: ホーム・テーマ・履歴・マイページ等への画面外遷移
export type FinishReason = 'completed' | 'abandoned'

// POST /api/v1/learning-sessions/{learning_session_id}/finish リクエストボディ
export interface FinishLearningSessionRequest {
  finish_reason: FinishReason
}

// POST /api/v1/learning-sessions/{learning_session_id}/finish 200 レスポンス。
// message はトースト等で BE 文言をそのまま表示する想定
export interface FinishLearningSessionResponse {
  message: string
}
