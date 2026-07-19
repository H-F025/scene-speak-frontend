'use client'

import { useReviewQuestion } from '../../api/useReviewQuestion'

import { ReviewProblemScreen } from './ReviewProblemScreen'

interface ReviewProblemSessionProps {
  reviewSetId: number
  reviewSetQuestionId: number
  isSubmitting: boolean
  rootError: string | undefined
  onSubmit: (questionChoiceId: number) => void
}

// useReviewQuestion (useSuspenseQuery) の境界の内側で render される子コンポーネント。
// pending は親 (ReviewProblemContent) の <Suspense> fallback、5xx 等の error は (main)/error.tsx に bubbling する。
//
// 解答送信 mutation / RHF / lifecycle は親で useReviewProblemController が一元管理しているため、
// 本コンポーネントは「データ取得 + presentational への橋渡し」に特化する
export function ReviewProblemSession({
  reviewSetId,
  reviewSetQuestionId,
  isSubmitting,
  rootError,
  onSubmit,
}: ReviewProblemSessionProps) {
  const { data } = useReviewQuestion(reviewSetId, reviewSetQuestionId)

  return (
    <>
      {rootError && (
        <div
          role="alert"
          className="mx-4 mt-3 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700"
        >
          {rootError}
        </div>
      )}
      <ReviewProblemScreen
        question={data.question}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </>
  )
}
