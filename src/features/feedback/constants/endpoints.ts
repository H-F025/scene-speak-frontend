import { API_BASE_URL } from '@/shared/lib/constants'

// feedback (通常問題フィードバック) feature が呼び出すバックエンドエンドポイント (一次情報源)

// 通常問題フィードバック取得 (06_Feedback_Correct / 06_Feedback_Incorrect)。
// 前画面の answer 送信レスポンスから取得した question_attempt_id を URL に含む
export const questionAttemptEndpoint = (attemptId: number): string =>
  `${API_BASE_URL}/question-attempts/${attemptId}`
