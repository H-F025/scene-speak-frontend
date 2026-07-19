'use client'

import { LoadingScreen } from '@/components'

import { usePracticeProblemController } from '../../hooks/usePracticeProblemController'

import { ThemeProblemSession } from './ThemeProblemSession'

interface ThemeProblemContentProps {
  themeLevelId: number
  questionId: number
}

// 通常問題回答画面 (/themes/[themeId]/questions/[questionId]) の Container。
// learning_session_id 確定までの 2 ステップ ((1) start mutation → (2) 問題取得 useSuspenseQuery) のうち、
// (1) start pending 中は明示的に LoadingScreen を返す。
// (2) useSuspenseQuery の suspend は親 (app/loading.tsx) の Suspense 境界に委ね、内側に <Suspense> を切らない。
//
// 1. mount で useStartLearningSession を発火 (usePracticeProblemController が担当)
// 2. start pending or lsid 未確定中は LoadingScreen
// 3. lsid 確定 → <ThemeProblemSession> 内の useThemeQuestion (useSuspenseQuery) は
//    親階層の loading.tsx で fallback される
// 4. start API の error は controller 内で throw され、(main)/error.tsx に bubbling
export function ThemeProblemContent({
  themeLevelId,
  questionId,
}: ThemeProblemContentProps) {
  const { learningSessionId, handleSubmit, isSubmitting, rootError } =
    usePracticeProblemController({ themeLevelId, questionId })

  if (learningSessionId === undefined) return <LoadingScreen />

  return (
    <ThemeProblemSession
      learningSessionId={learningSessionId}
      questionId={questionId}
      isSubmitting={isSubmitting}
      rootError={rootError}
      onSubmit={handleSubmit}
    />
  )
}
