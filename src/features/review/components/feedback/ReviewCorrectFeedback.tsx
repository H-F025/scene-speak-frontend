import { AnswerCard, ResultBadge } from '@/components'
import type { QuestionAttemptResult } from '@/features/feedback'

import { AskAiCta } from './AskAiCta'
import { ExplanationCard } from './ExplanationCard'

interface ReviewCorrectFeedbackProps {
  result: QuestionAttemptResult
  askAiHref: string
}

// 06_ReviewFeedback_Correct の本体レイアウト (success カラー)。
// 構成: ResultBadge:success → AnswerCard → ExplanationCard (子に AskAiCta:inline を内包)
export function ReviewCorrectFeedback({
  result,
  askAiHref,
}: ReviewCorrectFeedbackProps) {
  return (
    <>
      <ResultBadge variant="success" text="正解です！" />
      <AnswerCard label="あなたの回答" body={result.selected_choice.content} />
      <ExplanationCard body={result.explanation}>
        <AskAiCta href={askAiHref} />
      </ExplanationCard>
    </>
  )
}
