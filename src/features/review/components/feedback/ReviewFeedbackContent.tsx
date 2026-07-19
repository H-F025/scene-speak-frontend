'use client'

import { ActionButton } from '@/components'
import { BottomBar } from '@/components/BottomBar'
import { ArrowRight } from '@/components/icons'

import { useReviewFeedbackController } from '../../hooks/useReviewFeedbackController'

import { ReviewCorrectFeedback } from './ReviewCorrectFeedback'
import { ReviewIncorrectFeedback } from './ReviewIncorrectFeedback'

interface ReviewFeedbackContentProps {
  attemptId: number
  reviewSetId: number
}

// AI 質問画面 (09_QuestionPage) は本 spec スコープ外のため仮置き。
// 後続 spec で正規 path / ヘルパーに差し替える
const AI_QUESTION_PLACEHOLDER_HREF = '#'

// 復習フィードバック画面 (06_ReviewFeedback_*) の Container。
// attempt 取得 + 次問題遷移は useReviewFeedbackController に閉じ、
// 本コンポーネントは is_correct 分岐と BottomBar 配置のみ担当する。
// 2026-06-05 リデザインで BottomBar 内を ActionButton (h 56) 単体構造に統一
export function ReviewFeedbackContent({
  attemptId,
  reviewSetId,
}: ReviewFeedbackContentProps) {
  const { result, isLastProblem, handleNext } = useReviewFeedbackController({
    attemptId,
    reviewSetId,
  })

  return (
    <>
      <div className="flex flex-col gap-3 px-4 pt-4">
        {result.is_correct ? (
          <ReviewCorrectFeedback
            result={result}
            askAiHref={AI_QUESTION_PLACEHOLDER_HREF}
          />
        ) : (
          <ReviewIncorrectFeedback
            result={result}
            askAiHref={AI_QUESTION_PLACEHOLDER_HREF}
          />
        )}
      </div>
      <BottomBar>
        <ActionButton
          onClick={handleNext}
          trailingIcon={<ArrowRight aria-hidden className="size-4" />}
        >
          {isLastProblem ? '復習結果' : '次の復習へ'}
        </ActionButton>
      </BottomBar>
    </>
  )
}
