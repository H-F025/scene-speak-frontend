'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { ROUTES } from '@/shared/lib/constants'

import { useReviewCompletion } from '../api/useReviewCompletion'
import { NEXT_RECOMMENDATION_CONTENT } from '../constants'
import type { ReviewCompletionResponse } from '../types/reviewCompletion'

import { useReviewSession } from './useReviewSession'

interface UseReviewCompletionControllerProps {
  reviewSetId: number
}

interface UseReviewCompletionControllerReturn {
  data: ReviewCompletionResponse
  handleBackToHome: () => void
  handleNextRecommendation: () => void
}

// 復習完了画面 (07_ReviewComplete) の Container 用 hook。
// 責務: ① 完了情報の取得、② Provider 内 hasCompletedRef を立てる、③ 各種離脱ハンドラ提供。
// BE は最終問題の解答送信時に learning_session を自動 finish するため、本 hook では finish API を呼ばず
// markCompleted で「完了済み」フラグだけ立てて Provider unmount 時の abandoned 誤発火を抑止する
export function useReviewCompletionController({
  reviewSetId,
}: UseReviewCompletionControllerProps): UseReviewCompletionControllerReturn {
  const { push } = useRouter()
  const { data } = useReviewCompletion(reviewSetId)
  const { markCompleted } = useReviewSession()

  // StrictMode の setup→cleanup→setup 二重実行で markCompleted が 2 回呼ばれてもベキ等 (同じフラグを true に
  // セットするだけ) のため厳格な抑止は不要。ただし副作用呼び出しは 1 回に整理しておく
  const hasFiredRef = useRef(false)
  const markCompletedRef = useRef(markCompleted)
  markCompletedRef.current = markCompleted

  useEffect(() => {
    if (hasFiredRef.current) return
    hasFiredRef.current = true
    markCompletedRef.current()
  }, [])

  const handleBackToHome = () => push(ROUTES.HOME)
  const handleNextRecommendation = () => {
    const { href } = NEXT_RECOMMENDATION_CONTENT[data.next_recommendation_type]
    push(href)
  }

  return { data, handleBackToHome, handleNextRecommendation }
}
