import { useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/lib/apiClient'

import { PRACTICE_QUERY_KEYS, themeQuestionEndpoint } from '../constants'
import type { ThemeQuestionResponse } from '../types/problem'

const fetchThemeQuestion = async (
  learningSessionId: number,
  questionId: number,
): Promise<ThemeQuestionResponse> => {
  const { data } = await apiClient.get<ThemeQuestionResponse>(
    themeQuestionEndpoint(learningSessionId, questionId),
  )
  return data
}

// 通常問題 (05_ProblemScreen) の単一問題取得。
// learning_session_id は呼び出し側 (PracticeProblemScreen) が useStartLearningSession の onSuccess で取得した後に
// この hook を有効化する想定 (Suspense の境界が learning_session_id 確定後に切られる構造)
export const useThemeQuestion = (
  learningSessionId: number,
  questionId: number,
) =>
  useSuspenseQuery({
    queryKey: PRACTICE_QUERY_KEYS.themeQuestion(learningSessionId, questionId),
    queryFn: () => fetchThemeQuestion(learningSessionId, questionId),
    staleTime: 0,
  })
