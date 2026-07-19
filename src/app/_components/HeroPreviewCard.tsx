'use client'

import { useState } from 'react'

import { ChoiceCard, ResultBadge } from '@/components'

const SCENE_LABEL = 'レストランで'
const QUESTION =
  '店員さんに「メニューをいただけますか？」と伝えたいとき、最も自然な表現はどれ？'
const CHOICES = [
  { label: 'A', content: 'Could I get a menu, please?' },
  { label: 'B', content: 'Give me a menu.' },
  { label: 'C', content: 'Where is the menu?' },
] as const
const CORRECT_LABEL = 'A'

// TOP ページのファーストビュー用モックアップ。実際の出題画面と同じ ChoiceCard / ResultBadge を
// 静的データで再現し、「サービスの利用イメージ」を実物の UI で伝える。選択肢をクリックすると
// 選択状態が切り替わり、正解 (A) を選ぶと結果バッジが出る簡易デモ
export function HeroPreviewCard() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="w-full max-w-sm rounded-[32px] border border-border-subtle bg-white p-5 shadow-xl sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-[12px] font-semibold text-primary-dark">
          {SCENE_LABEL}
        </span>
        <span className="text-[12px] text-text-subtle">Q1 / 5</span>
      </div>

      <p className="mb-4 text-[15px] leading-relaxed text-text-heading">
        {QUESTION}
      </p>

      <div
        role="radiogroup"
        aria-label="選択肢 (デモ)"
        className="flex flex-col gap-2.5"
      >
        {CHOICES.map((choice) => (
          <ChoiceCard
            key={choice.label}
            label={choice.label}
            content={choice.content}
            selected={selected === choice.label}
            onClick={() => setSelected(choice.label)}
          />
        ))}
      </div>

      <div className="mt-4 min-h-11.5">
        {selected && (
          <ResultBadge
            variant={selected === CORRECT_LABEL ? 'success' : 'warn'}
            text={
              selected === CORRECT_LABEL
                ? '正解です！自然な表現です'
                : '惜しい！もっと自然な言い方があります'
            }
          />
        )}
      </div>
    </div>
  )
}
