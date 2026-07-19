import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useSuspenseQuery } from '@tanstack/react-query'
import { REVIEW_SETS_ENDPOINT, REVIEW_SET_QUERY_KEYS } from '../constants'
import type { ReviewSetResponse } from '../types/reviewSet'

const fetchReviewSet = async (): Promise<ReviewSetResponse> => {
  const { data } = await apiClient.get<ReviewSetResponse>(REVIEW_SETS_ENDPOINT)
  return data
}

// 苦手問題集 (今週の復習セット) 概要取得。pending は (main)/questions/loading.tsx、
// error は (main)/questions/error.tsx に委譲する
// (QueryProvider の throwOnError: true により 5xx 等もここから自動で Error Boundary へ伝播する)
export const useReviewSet = () =>
  useSuspenseQuery({
    queryKey: REVIEW_SET_QUERY_KEYS.summary(),
    queryFn: fetchReviewSet,
    staleTime: QUERY_STALE_TIME_LONG_MS,
  })
