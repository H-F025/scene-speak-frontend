import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { apiClient } from '@/shared/lib/apiClient'

import { themeAnswerEndpoint } from '../constants'
import type { SubmitAnswerInput } from '../schemas/submitAnswer'
import type { SubmitAnswerResponse } from '../types/problem'

// URL に含める learning_session_id / question_id と body (= SubmitAnswerInput) を単一引数で受ける
export interface SubmitAnswerVariables extends SubmitAnswerInput {
  learningSessionId: number
  questionId: number
}

const submitAnswerRequest = async ({
  learningSessionId,
  questionId,
  ...body
}: SubmitAnswerVariables): Promise<SubmitAnswerResponse> => {
  const { data } = await apiClient.post<SubmitAnswerResponse>(
    themeAnswerEndpoint(learningSessionId, questionId),
    body,
  )
  return data
}

// 通常解答送信。純粋な mutation として返し、画面遷移 / トーストは呼び出し側で実装する。
// 403 / 409 を root error に流すハンドリングは呼び出し側で createFormErrorHandler を介して接続する
export const useSubmitAnswer = () =>
  useMutation<SubmitAnswerResponse, AxiosError, SubmitAnswerVariables>({
    mutationFn: submitAnswerRequest,
  })
