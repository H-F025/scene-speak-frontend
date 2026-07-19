'use client'

import { useRouter } from 'next/navigation'

import {
  useQuestionAttemptQuery,
  type QuestionAttemptResult,
} from '@/features/feedback'
import { reviewCompletePath, reviewQuestionPath } from '@/shared/lib/constants'

interface UseReviewFeedbackControllerProps {
  attemptId: number
  reviewSetId: number
}

interface UseReviewFeedbackControllerReturn {
  result: QuestionAttemptResult
  isLastProblem: boolean
  handleNext: () => void
}

// 復習フィードバック (06_ReviewFeedback_*) の attempt 取得 + 次画面遷移を集約する hook。
// heartbeat / abandoned cleanup は ReviewSessionProvider が担当するため本 hook は session 管理に関与しない。
// next_question_id !== null: 次問題画面へ push (同セッション継続、CTA「次の復習へ」)
// next_question_id === null: 復習完了画面へ push (CTA「復習結果」、BE 側で session は自動 finish 済み)
export function useReviewFeedbackController({
  attemptId,
  reviewSetId,
}: UseReviewFeedbackControllerProps): UseReviewFeedbackControllerReturn {
  const { push } = useRouter()
  const { data } = useQuestionAttemptQuery(attemptId)
  const { next_question_id, result } = data
  const isLastProblem = next_question_id === null

  const handleNext = () => {
    if (next_question_id !== null) {
      push(reviewQuestionPath(reviewSetId, next_question_id))
      return
    }
    push(reviewCompletePath(reviewSetId))
  }

  return { result, isLastProblem, handleNext }
}
