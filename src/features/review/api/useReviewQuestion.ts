import { useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/lib/apiClient'

import { REVIEW_QUERY_KEYS, reviewQuestionEndpoint } from '../constants'
import type { ReviewQuestionResponse } from '../types/problem'

const fetchReviewQuestion = async (
  reviewSetId: number,
  reviewSetQuestionId: number,
): Promise<ReviewQuestionResponse> => {
  const { data } = await apiClient.get<ReviewQuestionResponse>(
    reviewQuestionEndpoint(reviewSetId, reviewSetQuestionId),
  )
  return data
}

// 復習問題 (05_ReviewProblemScreen) の単一問題取得。
// 通常問題と異なり review_set_id ベースのため learning_session_id を待たずに呼び出せる
export const useReviewQuestion = (
  reviewSetId: number,
  reviewSetQuestionId: number,
) =>
  useSuspenseQuery({
    queryKey: REVIEW_QUERY_KEYS.reviewQuestion(
      reviewSetId,
      reviewSetQuestionId,
    ),
    queryFn: () => fetchReviewQuestion(reviewSetId, reviewSetQuestionId),
    staleTime: 0,
  })
