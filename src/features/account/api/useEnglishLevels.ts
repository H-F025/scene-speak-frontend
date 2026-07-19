import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useSuspenseQuery } from '@tanstack/react-query'

import { ACCOUNT_ENDPOINTS, ACCOUNT_QUERY_KEYS } from '../constants'
import type { EnglishLevelsResponse } from '../types/englishLevel'

const fetchEnglishLevels = async (): Promise<EnglishLevelsResponse> => {
  const { data } = await apiClient.get<EnglishLevelsResponse>(
    ACCOUNT_ENDPOINTS.englishLevels,
  )
  return data
}

// 英語レベルのマスタ一覧 (初級/中級/上級)。
// pending は loading boundary、error は error boundary に委譲する
// (themes/history と同方針。QueryProvider の throwOnError: true により 5xx も Error Boundary へ伝播)。
// マスタは変動しない参照系のため長め staleTime で再 fetch を抑制する
export const useEnglishLevels = () =>
  useSuspenseQuery({
    queryKey: ACCOUNT_QUERY_KEYS.englishLevels(),
    queryFn: fetchEnglishLevels,
    staleTime: QUERY_STALE_TIME_LONG_MS,
  })
