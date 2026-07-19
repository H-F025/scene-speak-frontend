import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { apiClient } from '@/shared/lib/apiClient'

import { reviewAnswerEndpoint } from '../constants'
import type { SubmitAnswerInput } from '../schemas/submitAnswer'
import type { SubmitAnswerResponse } from '../types/problem'

// URL は review_set_id / review_set_question_id 系統で通常側 (practice) と別シーケンス
export interface SubmitReviewAnswerVariables extends SubmitAnswerInput {
  reviewSetId: number
  reviewSetQuestionId: number
}

const submitReviewAnswerRequest = async ({
  reviewSetId,
  reviewSetQuestionId,
  ...body
}: SubmitReviewAnswerVariables): Promise<SubmitAnswerResponse> => {
  const { data } = await apiClient.post<SubmitAnswerResponse>(
    reviewAnswerEndpoint(reviewSetId, reviewSetQuestionId),
    body,
  )
  return data
}

// 復習解答送信。BE は 201 Created を返すが axios はそれをエラー扱いしないため通常 mutation として扱える。
// 403 / 409 のルートエラー化は呼び出し側で createFormErrorHandler を介して接続する
export const useSubmitReviewAnswer = () =>
  useMutation<SubmitAnswerResponse, AxiosError, SubmitReviewAnswerVariables>({
    mutationFn: submitReviewAnswerRequest,
  })
