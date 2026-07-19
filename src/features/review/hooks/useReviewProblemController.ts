'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { HOME_QUERY_KEYS } from '@/features/home'
import { HTTP_STATUS, reviewQuestionFeedbackPath } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'

import { useSubmitReviewAnswer } from '../api/useSubmitReviewAnswer'
import {
  submitAnswerSchema,
  type SubmitAnswerInput,
} from '../schemas/submitAnswer'
import { useReviewSession } from './useReviewSession'

interface UseReviewProblemControllerProps {
  reviewSetId: number
  reviewSetQuestionId: number
}

// 復習問題 (05_ReviewProblemScreen) の解答送信フローを担う hook。
// learning_session の lifecycle (start / heartbeat / finish) は ReviewSessionProvider 側で
// セット全体で 1 セッション管理しているため、本 hook は session 開始/終了に関与しない。
// learning_session_id は Provider から取得し、解答送信 mutation に渡す
export function useReviewProblemController({
  reviewSetId,
  reviewSetQuestionId,
}: UseReviewProblemControllerProps) {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const { learningSessionId } = useReviewSession()

  const form = useForm<SubmitAnswerInput>({
    resolver: zodResolver(submitAnswerSchema),
    mode: 'onSubmit',
  })

  const { mutate: submitAnswer, isPending: isSubmitting } =
    useSubmitReviewAnswer()

  const handleSubmit = (questionChoiceId: number) => {
    form.clearErrors('root')
    form.setValue('question_choice_id', questionChoiceId, {
      shouldValidate: true,
    })
    form.handleSubmit((input) => {
      submitAnswer(
        {
          reviewSetId,
          reviewSetQuestionId,
          ...input,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEYS.ALL })
            push(
              reviewQuestionFeedbackPath(
                reviewSetId,
                reviewSetQuestionId,
                data.question_attempt_id,
              ),
            )
          },
          onError: createFormErrorHandler(form, {
            rootStatuses: [HTTP_STATUS.CONFLICT, HTTP_STATUS.FORBIDDEN],
          }),
        },
      )
    })()
  }

  return {
    learningSessionId,
    form,
    handleSubmit,
    isSubmitting,
    rootError: form.formState.errors.root?.message,
  }
}
