// review (復習問題) feature の public API。
// 外部から使うものが出てきた時点で都度 export を追加する (YAGNI)。
// ReviewProblemContent は復習問題回答画面 (/review-sets/[reviewSetId]/questions/[reviewSetQuestionId]) の Container 公開
export {
  QuestionCountBadge,
  QuestionProgress,
  ReviewCompleteContent,
  ReviewFeedbackContent,
  ReviewProblemContent,
  ReviewProblemScreen,
} from './components'
// (main)/layout.tsx の DynamicReviewProblemHeader が page と同 queryKey で再呼び出しするため公開する
// (TanStack Query の dedup により実 fetch は 1 回のまま)
export { useReviewQuestion } from './api/useReviewQuestion'
// /review-sets/[reviewSetId]/layout.tsx でセグメント配下に Provider をマウントするため公開
export { ReviewSessionProvider } from './providers/ReviewSessionProvider'
