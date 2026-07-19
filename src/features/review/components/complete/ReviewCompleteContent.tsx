'use client'

import { ActionButton, ResultBadge } from '@/components'
import { BottomBar } from '@/components/BottomBar'
import { ArrowRight } from '@/components/icons'

import { useReviewCompletionController } from '../../hooks/useReviewCompletionController'

import { PointCard } from './PointCard'
import { ResultCard } from './ResultCard'
import { ReviewNextRecommendationCta } from './ReviewNextRecommendationCta'

interface ReviewCompleteContentProps {
  reviewSetId: number
}

// 復習完了画面 (07_ReviewComplete) の Container。
// 完了情報取得 + マウント時の completeSession 発火 + 各種遷移は useReviewCompletionController に閉じ、
// 本コンポーネントは presentational 3 種と BottomBar の配置のみ担当する
export function ReviewCompleteContent({
  reviewSetId,
}: ReviewCompleteContentProps) {
  const { data, handleBackToHome, handleNextRecommendation } =
    useReviewCompletionController({ reviewSetId })

  return (
    <>
      <div className="flex flex-col gap-4 px-4 pt-5">
        <ResultBadge variant="success" text="復習完了 🎉" />
        <ResultCard
          totalCount={data.result.total_question_count}
          correctCount={data.result.correct_count}
        />
        <PointCard
          categories={data.reviewed_categories}
          categoryCount={data.reviewed_category_count}
        />
        <ReviewNextRecommendationCta
          type={data.next_recommendation_type}
          onClick={handleNextRecommendation}
        />
      </div>
      <BottomBar>
        <ActionButton
          onClick={handleBackToHome}
          trailingIcon={<ArrowRight aria-hidden className="size-5" />}
        >
          ホームへ戻る
        </ActionButton>
      </BottomBar>
    </>
  )
}
