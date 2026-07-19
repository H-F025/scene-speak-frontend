import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { apiClient } from '@/shared/lib/apiClient'

import { LEARNING_SESSIONS_ENDPOINT } from '../constants'
import type {
  StartLearningSessionRequest,
  StartLearningSessionResponse,
} from '../types/learningSession'

const startLearningSessionRequest = async (
  payload: StartLearningSessionRequest,
): Promise<StartLearningSessionResponse> => {
  const { data } = await apiClient.post<StartLearningSessionResponse>(
    LEARNING_SESSIONS_ENDPOINT,
    payload,
  )
  return data
}

// 純粋な mutation。learning_session_id の保持・後続 API 連鎖は呼び出し側 (ProblemScreen) で
// onSuccess に実装する。learning_type による discriminated union で payload の不正状態を型で防ぐ
export const useStartLearningSession = () =>
  useMutation<
    StartLearningSessionResponse,
    AxiosError,
    StartLearningSessionRequest
  >({
    mutationFn: startLearningSessionRequest,
  })
