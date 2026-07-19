'use client'

import type { AxiosError } from 'axios'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'

import {
  useFinishLearningSession,
  useLearningSessionHeartbeat,
  useStartLearningSession,
} from '@/features/learning-session'

import {
  ReviewSessionContext,
  type ReviewSessionContextValue,
} from './reviewSessionContext'

interface ReviewSessionProviderProps {
  reviewSetId: number
  children: ReactNode
}

// 復習セット (/review-sets/[reviewSetId]/*) 配下で 1 つの learning_session を共有する Provider。
// 同セット内の問題画面 → フィードバック画面 → 次問題画面の遷移は Next.js App Router の
// セグメント layout が再 mount されない性質を利用して同一 Provider を維持する。
// セット外への離脱 (= 本 Provider の unmount) で finish('abandoned') を fire-and-forget で発火する。
export function ReviewSessionProvider({
  reviewSetId,
  children,
}: ReviewSessionProviderProps) {
  const {
    mutate: startSession,
    data: startData,
    isPending: isStarting,
    error: startError,
  } = useStartLearningSession()

  // mount 時に 1 度だけ start を発火する。二重起動防止は isPending / startData の存在で gate
  useEffect(() => {
    if (startData || isStarting) return
    startSession({ learning_type: 'review', learning_target_id: reviewSetId })
  }, [startSession, startData, isStarting, reviewSetId])

  // start mutation の error は Error Boundary に bubbling
  if (startError) throw startError

  const learningSessionId = startData?.learning_session_id

  useLearningSessionHeartbeat(learningSessionId)

  const { mutate: finishSession, isPending: isCompleting } =
    useFinishLearningSession()

  // completeSession で完了済みなら unmount cleanup の abandoned を skip するフラグ。
  // ref で持つことで stale closure を防ぐ (skill 18-bug-prevention 準拠)
  const hasCompletedRef = useRef(false)
  const finishSessionRef = useRef(finishSession)
  finishSessionRef.current = finishSession

  // React StrictMode は effect を setup→cleanup→setup と二重実行する。
  // learningSessionId が確定している時に何もしないと最初の cleanup で abandoned が誤発火し、
  // 直後の completed が 409 になる。microtask に遅延し、再 mount が起きていれば mountIdRef が
  // 進んでいるので skip する (features/feedback の useFeedbackController と同パターン)
  const mountIdRef = useRef(0)

  useEffect(() => {
    if (learningSessionId === undefined) return
    mountIdRef.current += 1
    const myMountId = mountIdRef.current
    return () => {
      queueMicrotask(() => {
        if (mountIdRef.current !== myMountId) return
        if (hasCompletedRef.current) return
        finishSessionRef.current({
          learningSessionId,
          finish_reason: 'abandoned',
        })
      })
    }
  }, [learningSessionId])

  const value = useMemo<ReviewSessionContextValue>(
    () => ({
      learningSessionId,
      isCompleting,
      completeSession: ({ onSuccess, onError }) => {
        if (learningSessionId === undefined) return
        finishSessionRef.current(
          { learningSessionId, finish_reason: 'completed' },
          {
            onSuccess: () => {
              hasCompletedRef.current = true
              onSuccess?.()
            },
            onError: (error: AxiosError) => onError?.(error),
          },
        )
      },
      // API 呼び出しなしで「完了済み」フラグだけセットする。
      // BE が最終解答送信時に session を自動 finish する仕様のため、完了画面では本メソッドだけ呼ぶ
      markCompleted: () => {
        hasCompletedRef.current = true
      },
    }),
    [learningSessionId, isCompleting],
  )

  return (
    <ReviewSessionContext.Provider value={value}>
      {children}
    </ReviewSessionContext.Provider>
  )
}
