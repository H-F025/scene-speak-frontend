import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useSuspenseQuery } from '@tanstack/react-query'

import { HISTORY_ENDPOINTS, HISTORY_QUERY_KEYS } from '../constants'
import type { HistoryResponse } from '../types/history'

interface UseHistoryQueryParams {
  // YYYY-MM 形式。未指定なら BE が当月を返す
  yearMonth?: string
}

const fetchHistories = async (
  yearMonth: string | undefined,
): Promise<HistoryResponse> => {
  const { data } = await apiClient.get<HistoryResponse>(
    HISTORY_ENDPOINTS.list,
    {
      // year_month 未指定なら全期間を返す (BE 仕様)
      params: yearMonth ? { year_month: yearMonth } : undefined,
    },
  )
  return data
}

// 学習履歴 + 統計の取得クエリ。pending は app/loading.tsx、error は app/error.tsx の boundary に委譲する
// (QueryProvider の throwOnError: true により 5xx 等もここから自動で Error Boundary へ伝播する。themes/home と同方針)。
// yearMonth 違いは別キャッシュとして扱い、同月を再選択した時の追加 fetch を抑制する。
export const useHistoryQuery = ({ yearMonth }: UseHistoryQueryParams = {}) =>
  useSuspenseQuery({
    queryKey: HISTORY_QUERY_KEYS.list(yearMonth),
    queryFn: () => fetchHistories(yearMonth),
    staleTime: QUERY_STALE_TIME_LONG_MS,
  })
