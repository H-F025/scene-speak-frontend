'use client'

import { useReviewSet } from '../api/useReviewSet'
import { ReviewCategoryList } from './ReviewCategoryList'
import { ReviewSetCard } from './ReviewSetCard'
import { ReviewSetEmpty } from './ReviewSetEmpty'
import { ReviewSetIntro } from './ReviewSetIntro'
import { ReviewSetTip } from './ReviewSetTip'
import { StartReviewButton } from './StartReviewButton'

// 苦手問題集画面の Container Component。
// useSuspenseQuery (useReviewSet) で取得し、pending / error は同セグメントの
// loading.tsx / error.tsx (App Router 規約) に委譲する。
// 画面 Header は (main)/layout.tsx が pathname マッピングで描画するため本コンポーネントでは扱わない。
// question_count による Card 群 / Empty 切り替えのみ責務として持つ
export function QuestionsContent() {
  const { data } = useReviewSet()
  const hasReviewableQuestions = data.question_count > 0

  return (
    <main className="flex flex-col gap-4 p-4">
      <ReviewSetIntro />
      {hasReviewableQuestions && data.priority !== 'non' ? (
        <>
          <ReviewSetCard
            questionCount={data.question_count}
            priority={data.priority}
            priorityLabel={data.priority_label}
            estimatedMinutes={data.estimated_minutes}
          />
          <ReviewCategoryList categories={data.categories} />
          <ReviewSetTip />
          <StartReviewButton />
        </>
      ) : (
        <ReviewSetEmpty />
      )}
    </main>
  )
}
