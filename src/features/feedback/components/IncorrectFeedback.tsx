import { AnswerCard, CorrectCard, ResultBadge } from '@/components'
import { ArrowDown } from '@/components/icons'

import type { QuestionAttemptResult } from '../types/questionAttempt'

import { AskAiCta } from './AskAiCta'
import { CompareBlock } from './CompareBlock'
import { ExplanationCard } from './ExplanationCard'

interface IncorrectFeedbackProps {
  result: QuestionAttemptResult
  askAiHref: string
}

// 06_Feedback_Incorrect の本体レイアウト (warn カラー)。
// 構成: ResultBadge:warn → AnswerCard → arrow-down → CorrectCard →
//       ExplanationCard (子要素に CompareBlock + AskAiCta:inline を流し込み)
export function IncorrectFeedback({
  result,
  askAiHref,
}: IncorrectFeedbackProps) {
  return (
    <>
      <ResultBadge variant="warn" text="惜しいです！" />
      <AnswerCard label="あなたの回答" body={result.selected_choice.content} />
      <div className="flex justify-center" aria-hidden>
        <ArrowDown className="size-5 text-brand" />
      </div>
      <CorrectCard label="正しい回答" body={result.correct_choice.content} />
      <ExplanationCard body={result.explanation}>
        <CompareBlock
          wrong={result.selected_choice.content}
          correct={result.correct_choice.content}
        />
        <AskAiCta href={askAiHref} />
      </ExplanationCard>
    </>
  )
}
