import { useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/lib/apiClient'

import { FEEDBACK_QUERY_KEYS, questionAttemptEndpoint } from '../constants'
import type { QuestionAttemptResponse } from '../types/questionAttempt'

const fetchQuestionAttempt = async (
  attemptId: number,
): Promise<QuestionAttemptResponse> => {
  const { data } = await apiClient.get<QuestionAttemptResponse>(
    questionAttemptEndpoint(attemptId),
  )
  return data
}

// 通常問題フィードバック (06_Feedback_*) の単一 attempt 結果取得。
// attempt は BE 生成済みの最終結果のため属性は immutable。Suspense 境界で 1 回取得し、
// 同一 attemptId に対する再 mount でも追加 fetch を起こさないよう staleTime を inline 指定
export const useQuestionAttemptQuery = (attemptId: number) =>
  useSuspenseQuery({
    queryKey: FEEDBACK_QUERY_KEYS.questionAttempt(attemptId),
    queryFn: () => fetchQuestionAttempt(attemptId),
    staleTime: 0,
  })
