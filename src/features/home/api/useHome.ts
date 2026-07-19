import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useSuspenseQuery } from '@tanstack/react-query'
import { HOME_ENDPOINT, HOME_QUERY_KEYS } from '../constants'
import type { HomeResponse } from '../types/home'

const fetchHome = async (): Promise<HomeResponse> => {
  const { data } = await apiClient.get<HomeResponse>(HOME_ENDPOINT)
  return data
}

// ホーム画面のサスペンスクエリ。pending は (main)/loading.tsx、error は (main)/error.tsx に委譲する
// (QueryProvider の throwOnError: true により 5xx 等もここから自動で Error Boundary へ伝播する)
export const useHome = () =>
  useSuspenseQuery({
    queryKey: HOME_QUERY_KEYS.ALL,
    queryFn: fetchHome,
    staleTime: QUERY_STALE_TIME_LONG_MS,
  })
