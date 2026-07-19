import type { QuestionListItem } from '../../types/themeQuestions'

import { QuestionListEmpty } from './QuestionListEmpty'
import { QuestionRow } from './QuestionRow'

interface QuestionListProps {
  questions: QuestionListItem[]
  // 最初の `is_completed === false` の index。全問完了時は -1
  nextQuestionIndex: number
  themeLevelId: number
}

// 問題一覧。空配列なら QuestionListEmpty にフォールバックする
export function QuestionList({
  questions,
  nextQuestionIndex,
  themeLevelId,
}: QuestionListProps) {
  if (questions.length === 0) return <QuestionListEmpty />

  return (
    <>
      <p className="text-[13px] font-bold text-ink-500">練習問題</p>
      <ul className="flex flex-col gap-3">
        {questions.map((question, index) => (
          <li key={question.id}>
            <QuestionRow
              question={question}
              isNext={index === nextQuestionIndex}
              themeLevelId={themeLevelId}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
