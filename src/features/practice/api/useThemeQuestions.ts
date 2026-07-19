import { useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/lib/apiClient'

import { PRACTICE_QUERY_KEYS, themeQuestionsEndpoint } from '../constants'
import type { ThemeQuestionsResponse } from '../types/themeQuestions'

const fetchThemeQuestions = async (
  themeLevelId: number,
): Promise<ThemeQuestionsResponse> => {
  const { data } = await apiClient.get<ThemeQuestionsResponse>(
    themeQuestionsEndpoint(themeLevelId),
  )
  return data
}

// テーマ別問題一覧のサスペンスクエリ。
// 引数の themeLevelId は theme_levels テーブルの PK (= Theme × EnglishLevel の組合せ)。
// Theme.id (テーマ PK) とは別シーケンスのため混同しないこと。
//
// staleTime: 0 + refetchOnMount: 'always' は本spec限定の暫定戦略。
// 問題画面 (/questions/[questionId]) で解答 → 戻ってきた時に進捗を最新化するため。
// 解答完了 mutation の onSuccess で invalidateQueries に移行する想定
export const useThemeQuestions = (themeLevelId: number) =>
  useSuspenseQuery({
    queryKey: PRACTICE_QUERY_KEYS.themeQuestions(themeLevelId),
    queryFn: () => fetchThemeQuestions(themeLevelId),
    staleTime: 0,
    refetchOnMount: 'always',
  })
