'use client'

import { useMemo } from 'react'

import { useThemeQuestions } from '../../api/useThemeQuestions'

import { ContinueButton } from './ContinueButton'
import { ProgressCard } from './ProgressCard'
import { QuestionList } from './QuestionList'

interface ProblemListContentProps {
  themeLevelId: number
}

// 練習問題一覧画面の Container。
// useSuspenseQuery は queryKey 単位で in-flight dedup されるため、layout 側との二重呼び出しでも
// 実 fetch は 1 回。pending は app/loading.tsx、error は app/error.tsx に bubbling 委譲する
export function ProblemListContent({ themeLevelId }: ProblemListContentProps) {
  const { data } = useThemeQuestions(themeLevelId)
  const { theme, questions } = data

  const nextQuestionIndex = useMemo(
    () => questions.findIndex((q) => !q.is_completed),
    [questions],
  )
  const nextQuestionId =
    nextQuestionIndex === -1 ? null : questions[nextQuestionIndex].id

  return (
    <>
      <main className="flex flex-col gap-3 px-4 pt-4 pb-24">
        <ProgressCard
          completedCount={theme.completed_question_count}
          totalCount={theme.total_question_count}
          progressPercentage={theme.progress_percentage}
        />
        <QuestionList
          questions={questions}
          nextQuestionIndex={nextQuestionIndex}
          themeLevelId={themeLevelId}
        />
      </main>
      <ContinueButton
        nextQuestionId={nextQuestionId}
        themeLevelId={themeLevelId}
        completedCount={theme.completed_question_count}
      />
    </>
  )
}
