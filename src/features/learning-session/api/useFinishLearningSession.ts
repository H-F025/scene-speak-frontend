import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { apiClient } from '@/shared/lib/apiClient'

import { learningSessionFinishEndpoint } from '../constants'
import type {
  FinishLearningSessionRequest,
  FinishLearningSessionResponse,
} from '../types/learningSession'

// URL に含める learning_session_id を body と一緒に variables として受ける。
// 「次の会話を始める」(completed) と画面外遷移 (abandoned) で同じフックを共有する
export interface FinishLearningSessionVariables extends FinishLearningSessionRequest {
  learningSessionId: number
}

const finishLearningSessionRequest = async ({
  learningSessionId,
  ...body
}: FinishLearningSessionVariables): Promise<FinishLearningSessionResponse> => {
  const { data } = await apiClient.post<FinishLearningSessionResponse>(
    learningSessionFinishEndpoint(learningSessionId),
    body,
  )
  return data
}

// 純粋な mutation。トースト・画面遷移は呼び出し側 (ProblemScreen / Feedback) で onSuccess に実装する。
// 中断ハンドラから fire-and-forget で呼ぶケースは mutate (await しない) を想定し、
// 二重発火防止は呼び出し側で isPending を見る
export const useFinishLearningSession = () =>
  useMutation<
    FinishLearningSessionResponse,
    AxiosError,
    FinishLearningSessionVariables
  >({
    mutationFn: finishLearningSessionRequest,
  })
