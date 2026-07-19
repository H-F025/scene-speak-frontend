'use client'

import { useState } from 'react'

// PracticeProblemScreen のローカル UI 状態を集約する hook。
// 「選択中の choice」「ヒントの表示 / 非表示」のみを扱う (mutation や form 連携は呼び出し側で別 hook 化する)
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
