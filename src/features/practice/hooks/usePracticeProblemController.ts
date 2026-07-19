'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { HOME_QUERY_KEYS } from '@/features/home'
import {
  useFinishLearningSession,
  useLearningSessionHeartbeat,
  useStartLearningSession,
} from '@/features/learning-session'
import { HTTP_STATUS, feedbackPath } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'

import { useSubmitAnswer } from '../api/useSubmitAnswer'
import {
  submitAnswerSchema,
  type SubmitAnswerInput,
} from '../schemas/submitAnswer'

interface UsePracticeProblemControllerProps {
  themeLevelId: number
  questionId: number
}

// 通常問題 (05_ProblemScreen) の lifecycle・解答送信・中断 finish を一元管理する hook。
// useThemeQuestion (useSuspenseQuery) は learning_session_id 確定後にしか呼べないため
// 本 hook は呼ばず、子コンポーネント (Suspense 境界の内側) で呼ぶ前提。
//
// セッション継続範囲: 1 問ごと (Feedback で finish('completed') → 次問題で再 start) を想定。
// そのため本画面の unmount cleanup では「submit 成功後の Feedback 遷移」だけは finish('abandoned')
// を発火しない (= Feedback 画面が completed で finish するため二重発火を避ける)
export function usePracticeProblemController({
  themeLevelId,
  questionId,
}: UsePracticeProblemControllerProps) {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: startSession,
    data: startData,
    isPending: isStarting,
    error: startError,
  } = useStartLearningSession()

  // mount 時に 1 度だけ start を発火する。二重起動防止は isPending / startData の存在で gate
  useEffect(() => {
    if (startData || isStarting) return
    startSession({ learning_type: 'normal', learning_target_id: themeLevelId })
  }, [startSession, startData, isStarting, themeLevelId])

  // start mutation の error は Error Boundary に bubbling
  if (startError) throw startError

  const learningSessionId = startData?.learning_session_id

  useLearningSessionHeartbeat(learningSessionId)

  const form = useForm<SubmitAnswerInput>({
    resolver: zodResolver(submitAnswerSchema),
    mode: 'onSubmit',
  })

  const { mutate: submitAnswer, isPending: isSubmitting } = useSubmitAnswer()

  // submit 成功 → Feedback 画面遷移後の unmount で finish('abandoned') を呼ばないためのフラグ。
  // ref で持つことで stale closure (古い state を掴む) を防ぐ (skill 18-bug-prevention)
  const hasSubmittedRef = useRef(false)

  const { mutate: finishSession } = useFinishLearningSession()
  const finishSessionRef = useRef(finishSession)
  finishSessionRef.current = finishSession

  // dev の React StrictMode は effect を setup→cleanup→setup と二重実行する。
  // learningSessionId が確定した直後のコミットで何もしないと最初の cleanup で
  // 'abandoned' が誤発火し、submit が 409 になる。microtask に遅延し、再 mount が
  // 起きていれば mountIdRef が進んでいるので skip する
  // (features/feedback の useFeedbackController と同パターン)
  const mountIdRef = useRef(0)

  useEffect(() => {
    if (learningSessionId === undefined) return
    mountIdRef.current += 1
    const myMountId = mountIdRef.current
    return () => {
      queueMicrotask(() => {
        if (mountIdRef.current !== myMountId) return
        if (hasSubmittedRef.current) return
        finishSessionRef.current({
          learningSessionId,
          finish_reason: 'abandoned',
        })
      })
    }
  }, [learningSessionId])

  const handleSubmit = (questionChoiceId: number) => {
    if (learningSessionId === undefined) return
    form.clearErrors('root')
    form.setValue('question_choice_id', questionChoiceId, {
      shouldValidate: true,
    })
    form.handleSubmit((input) => {
      submitAnswer(
        {
          learningSessionId,
          questionId,
          ...input,
        },
        {
          onSuccess: (data) => {
            hasSubmittedRef.current = true
            queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEYS.ALL })
            push(
              feedbackPath(questionId, data.question_attempt_id, themeLevelId),
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
