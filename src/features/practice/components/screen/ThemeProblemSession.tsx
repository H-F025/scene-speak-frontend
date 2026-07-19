'use client'

import { useThemeQuestion } from '../../api/useThemeQuestion'

import { PracticeProblemScreen } from './PracticeProblemScreen'

interface ThemeProblemSessionProps {
  learningSessionId: number
  questionId: number
  isSubmitting: boolean
  rootError: string | undefined
  onSubmit: (questionChoiceId: number) => void
}

// learning_session_id 確定後にだけ render される子コンポーネント。
// useSuspenseQuery は親 (ThemeProblemContent) の <Suspense> 境界の内側で呼ばれる前提で、
// pending は親の fallback、5xx 等の error は (main)/error.tsx に bubbling する。
//
// 解答送信 mutation / RHF / lifecycle は親で usePracticeProblemController が一元管理しているため、
// 本コンポーネントは「データ取得 + presentational への橋渡し」に特化する
export function ThemeProblemSession({
  learningSessionId,
  questionId,
  isSubmitting,
  rootError,
  onSubmit,
}: ThemeProblemSessionProps) {
  const { data } = useThemeQuestion(learningSessionId, questionId)

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
      <PracticeProblemScreen
        question={data.question}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </>
  )
}
