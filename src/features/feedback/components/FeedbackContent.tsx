'use client'

import { ActionButton } from '@/components'
import { BottomBar } from '@/components/BottomBar'
import { ArrowRight } from '@/components/icons'

import { useFeedbackController } from '../hooks/useFeedbackController'

import { CorrectFeedback } from './CorrectFeedback'
import { IncorrectFeedback } from './IncorrectFeedback'

interface FeedbackContentProps {
  attemptId: number
  themeLevelId: number
}

// AI 質問画面 (09_QuestionPage) は本 spec スコープ外のため仮置き。
// 後続 spec で正規 path / ヘルパーに差し替える
const AI_QUESTION_PLACEHOLDER_HREF = '#'

// 通常問題フィードバック画面 (06_Feedback_*) の Container。
// lifecycle (取得 / heartbeat / finish / 遷移) は useFeedbackController に閉じ、
// 本コンポーネントは is_correct 分岐と BottomBar 配置のみ担当する
export function FeedbackContent({
  attemptId,
  themeLevelId,
}: FeedbackContentProps) {
  const { result, isFinishing, handleNext } = useFeedbackController({
    attemptId,
    themeLevelId,
  })

  return (
    <>
      <div className="flex flex-col gap-3 px-4 pt-4">
        {result.is_correct ? (
          <CorrectFeedback
            result={result}
            askAiHref={AI_QUESTION_PLACEHOLDER_HREF}
          />
        ) : (
          <IncorrectFeedback
            result={result}
            askAiHref={AI_QUESTION_PLACEHOLDER_HREF}
          />
        )}
      </div>
      <BottomBar>
        <ActionButton
          onClick={handleNext}
          disabled={isFinishing}
          trailingIcon={<ArrowRight aria-hidden className="size-4" />}
        >
          次の会話を始める
        </ActionButton>
      </BottomBar>
    </>
  )
}
