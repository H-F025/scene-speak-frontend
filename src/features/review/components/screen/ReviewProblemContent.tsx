'use client'

import { LoadingScreen } from '@/components'

import { useReviewProblemController } from '../../hooks/useReviewProblemController'

import { ReviewProblemSession } from './ReviewProblemSession'

interface ReviewProblemContentProps {
  reviewSetId: number
  reviewSetQuestionId: number
}

// 復習問題回答画面 (/review-sets/[reviewSetId]/questions/[questionId]) の Container。
// start mutation は親セグメントの ReviewSessionProvider (review-sets/[reviewSetId]/layout) で発火される。
// lsid 確定までは明示的に LoadingScreen を返し、解答送信を mount 直後のエッジケースから守る。
// useReviewQuestion (useSuspenseQuery) の suspend は親 (app/loading.tsx) の Suspense 境界に委ね、
// 内側に <Suspense> を切らない。start API の error は Provider 内で throw され (main)/error.tsx に bubbling
export function ReviewProblemContent({
  reviewSetId,
  reviewSetQuestionId,
}: ReviewProblemContentProps) {
  const { learningSessionId, handleSubmit, isSubmitting, rootError } =
    useReviewProblemController({ reviewSetId, reviewSetQuestionId })

  if (learningSessionId === undefined) return <LoadingScreen />

  return (
    <ReviewProblemSession
      reviewSetId={reviewSetId}
      reviewSetQuestionId={reviewSetQuestionId}
      isSubmitting={isSubmitting}
      rootError={rootError}
      onSubmit={handleSubmit}
    />
  )
}
