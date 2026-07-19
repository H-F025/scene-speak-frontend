'use client'

import { useState } from 'react'

// ReviewProblemScreen のローカル UI 状態を集約する hook。
// 「選択中の choice」「ヒントの表示 / 非表示」のみを扱う。
// practice 側と同じ実装だが、Rule of Three (3 箇所目で共通化) に従い各 feature で独立保持する
export function useProblemScreenState() {
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null)
  const [isHintShown, setIsHintShown] = useState(false)

  const handleSelectChoice = (choiceId: number) => {
    setSelectedChoiceId(choiceId)
  }

  const handleToggleHint = () => {
    setIsHintShown((prev) => !prev)
  }

  return {
    selectedChoiceId,
    isHintShown,
    handleSelectChoice,
    handleToggleHint,
  }
}
