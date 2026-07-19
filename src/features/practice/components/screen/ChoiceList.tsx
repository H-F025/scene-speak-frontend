import { ChoiceCard } from '@/components'

import type { QuestionChoice } from '../../types/problem'

interface ChoiceListProps {
  choices: QuestionChoice[]
  selectedChoiceId: number | null
  onSelect: (choiceId: number) => void
}

// A〜D 等の選択肢ラベル。choices の配列順 (BE が返す順序) で固定割り当てする
const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const

export function ChoiceList({
  choices,
  selectedChoiceId,
  onSelect,
}: ChoiceListProps) {
  return (
    <div role="radiogroup" aria-label="選択肢" className="flex flex-col gap-3">
      {choices.map((choice, index) => {
        const label = CHOICE_LABELS[index] ?? String(index + 1)
        return (
          <ChoiceCard
            key={choice.id}
            label={label}
            content={choice.content}
            selected={selectedChoiceId === choice.id}
            onClick={() => onSelect(choice.id)}
          />
        )
      })}
    </div>
  )
}
