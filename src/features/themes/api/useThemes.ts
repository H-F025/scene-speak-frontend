import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useSuspenseQuery } from '@tanstack/react-query'
import { THEMES_ENDPOINT, THEME_QUERY_KEYS } from '../constants'
import type { EnglishLevel } from '../schemas/englishLevel'
import type { ThemesResponse } from '../types/theme'

const fetchThemes = async (
  level: EnglishLevel | undefined,
): Promise<ThemesResponse> => {
  const { data } = await apiClient.get<ThemesResponse>(THEMES_ENDPOINT, {
    // level 未指定時はクエリを送らず、バックエンドがユーザーの現在レベルを解決する仕様に従う
    params: level ? { english_level: level } : undefined,
  })
  return data
}

// テーマ一覧のサスペンスクエリ。pending は (main)/loading.tsx、error は (main)/error.tsx に委譲する
// (QueryProvider の throwOnError: true により 5xx 等もここから自動で Error Boundary へ伝播する)
// level 違いは別キャッシュとして扱われ、同タブを再選択した時の追加 fetch を抑制する
export const useThemes = (level: EnglishLevel | undefined) =>
  useSuspenseQuery({
    queryKey: THEME_QUERY_KEYS.list(level),
    queryFn: () => fetchThemes(level),
    staleTime: QUERY_STALE_TIME_LONG_MS,
  })
