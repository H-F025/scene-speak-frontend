// feedback (通常問題フィードバック) feature の public API。
// 外部から使うものが出てきた時点で都度 export を追加する (YAGNI)
export { FeedbackContent } from './components'
// 復習フィードバック (features/review) から同 API hook を再利用するため公開する
// (TanStack Query の dedup により実 fetch は 1 回のまま)
export { useQuestionAttemptQuery } from './api/useQuestionAttemptQuery'
export type { QuestionAttemptResult } from './types/questionAttempt'
