'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import {
  useFinishLearningSession,
  useLearningSessionHeartbeat,
} from '@/features/learning-session'
import { showApiErrorToast } from '@/shared/lib/apiErrorToast'
import { themeQuestionPath, themeQuestionsPath } from '@/shared/lib/constants'

import { useQuestionAttemptQuery } from '../api'
import type { QuestionAttemptResult } from '../types/questionAttempt'

interface UseFeedbackControllerProps {
  attemptId: number
  themeLevelId: number
}

interface UseFeedbackControllerReturn {
  result: QuestionAttemptResult
  isFinishing: boolean
  handleNext: () => void
}

// 通常問題フィードバック (06_Feedback_*) の lifecycle (attempt 取得 / heartbeat / finish / 遷移) を集約する hook。
// FeedbackContent は本 hook の戻り値を受け取って presentational に組み立てるだけ
// (practice の usePracticeProblemController と同じ責務分離方針)。
export function useFeedbackController({
  attemptId,
  themeLevelId,
}: UseFeedbackControllerProps): UseFeedbackControllerReturn {
  const { push } = useRouter()
  const { data } = useQuestionAttemptQuery(attemptId)
  const { learning_session_id, next_question_id, result } = data

  useLearningSessionHeartbeat(learning_session_id)

  const { mutate: finishSession, isPending: isFinishing } =
    useFinishLearningSession()

  // 「次の会話」or タブ移動・戻る時に finish が走るが、両方走らせると 2 回目が 409 になる。
  // 「次の会話」成功時にフラグを立て、unmount cleanup の abandoned 発火を skip する
  // (practice の hasSubmittedRef と同方針)
  const hasCompletedRef = useRef(false)
  const finishSessionRef = useRef(finishSession)
  finishSessionRef.current = finishSession

  // dev の React StrictMode は effect を setup→cleanup→setup と二重実行する。
  // learning_session_id は useSuspenseQuery で初回 mount から確定しているため、
  // 何もしないと最初の cleanup で 'abandoned' が誤発火 → 「次の会話」押下時に 409 になる。
  // microtask に遅延し、再 mount が起きていれば mountIdRef が進んでいるので skip する
  const mountIdRef = useRef(0)

  useEffect(() => {
    mountIdRef.current += 1
    const myMountId = mountIdRef.current
    return () => {
      queueMicrotask(() => {
        if (mountIdRef.current !== myMountId) return
        if (hasCompletedRef.current) return
        finishSessionRef.current({
          learningSessionId: learning_session_id,
          finish_reason: 'abandoned',
        })
      })
    }
  }, [learning_session_id])

  const handleNext = () => {
    finishSession(
      {
        learningSessionId: learning_session_id,
        finish_reason: 'completed',
      },
      {
        onSuccess: () => {
          hasCompletedRef.current = true
          if (next_question_id !== null) {
            push(themeQuestionPath(themeLevelId, next_question_id))
          } else {
            push(themeQuestionsPath(themeLevelId))
          }
        },
        onError: (error) => {
          // 補償処理: finish 失敗時は fallback としてテーマ問題一覧へ。
          // (spec 考慮事項「補償ロールバックはしない」方針で、abandoned は cleanup に委ねる)
          showApiErrorToast(error)
          push(themeQuestionsPath(themeLevelId))
        },
      },
    )
  }

  return {
    result,
    isFinishing,
    handleNext,
  }
}
