import { useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/lib/apiClient'

import { REVIEW_QUERY_KEYS, reviewCompletionEndpoint } from '../constants'
import type { ReviewCompletionResponse } from '../types/reviewCompletion'

const fetchReviewCompletion = async (
  reviewSetId: number,
): Promise<ReviewCompletionResponse> => {
  const { data } = await apiClient.get<ReviewCompletionResponse>(
    reviewCompletionEndpoint(reviewSetId),
  )
  return data
}

// 復習完了画面 (07_ReviewComplete) の結果取得。
// 401 は apiClient interceptor が /login にリダイレクト、409 (セット未完了) は ErrorBoundary に委譲する
export const useReviewCompletion = (reviewSetId: number) =>
  useSuspenseQuery({
    queryKey: REVIEW_QUERY_KEYS.reviewCompletion(reviewSetId),
    queryFn: () => fetchReviewCompletion(reviewSetId),
    staleTime: 0,
  })
