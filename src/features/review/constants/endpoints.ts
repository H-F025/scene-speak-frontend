import { API_BASE_URL } from '@/shared/lib/constants'

// review (復習問題) feature が呼び出すバックエンドエンドポイント (一次情報源)

// 復習問題取得 (05_ReviewProblemScreen)
export const reviewQuestionEndpoint = (
  reviewSetId: number,
  reviewSetQuestionId: number,
): string =>
  `${API_BASE_URL}/review-sets/${reviewSetId}/questions/${reviewSetQuestionId}`

// 復習解答送信 (05_ReviewProblemScreen)。201 Created を返す
export const reviewAnswerEndpoint = (
  reviewSetId: number,
  reviewSetQuestionId: number,
): string =>
  `${API_BASE_URL}/review-sets/${reviewSetId}/questions/${reviewSetQuestionId}/answer`

// 復習完了取得 (07_ReviewComplete)。セット未完了時は 409 Conflict を返す
export const reviewCompletionEndpoint = (reviewSetId: number): string =>
  `${API_BASE_URL}/review-sets/${reviewSetId}/completion`
