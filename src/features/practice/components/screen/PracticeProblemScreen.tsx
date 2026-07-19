'use client'

import { Lightbulb } from '@/components/icons'
import { Button } from '@/components/ui'
import { cn } from '@/shared/lib/utils'

import { BottomBar } from '@/components/BottomBar'

import { useProblemScreenState } from '../../hooks/useProblemScreenState'
import type { QuestionDetail } from '../../types/problem'

import { ChoiceList } from './ChoiceList'
import { SceneCard } from './SceneCard'

interface PracticeProblemScreenProps {
  question: QuestionDetail
  // 解答送信の進行中フラグ。BottomBar の二重送信防止に使う
  isSubmitting: boolean
  // 「答えを確認する」押下時のコールバック
  onSubmit: (questionChoiceId: number) => void
}

// 05_ProblemScreen の Presentational コンポーネント (通常問題専用)。
// シーンカード / 選択肢 / BottomBar を組み立てる。
//
// Header (タイトル + QuestionCountBadge + 戻る + QuestionProgress) は (main)/layout.tsx の
// 動的 Header (DynamicProblemQuestionHeader) が render するため本コンポーネントは保持しない。
// 戻るボタン押下時の finish('abandoned') は usePracticeProblemController の useEffect cleanup で発火
export function PracticeProblemScreen({
  question,
  isSubmitting,
  onSubmit,
}: PracticeProblemScreenProps) {
  const {
    selectedChoiceId,
    isHintShown,
    handleSelectChoice,
    handleToggleHint,
  } = useProblemScreenState()

  const handleSubmit = () => {
    if (selectedChoiceId === null) return
    onSubmit(selectedChoiceId)
  }

  const isAnswerDisabled = selectedChoiceId === null || isSubmitting

  return (
    <>
      {/* layout 側 `pb-23.75` (TabBar 95px) はそのままに、本画面の BottomBar (h ~ 76px) ぶんを `pb-44` で確保 */}
      <main className="flex flex-col pb-44">
        {/* english.ui.json `content` section の `padding: 16` (uniform) / `gap: 16` に準拠。
            左右は `px-4`、子要素間は `gap-4`、上は `pt-4` で確保 (下は `<main>` の `pb-44` が
            BottomBar 退避分も合わせて担当) */}
        <div className="flex flex-col gap-4 px-4 pt-4">
          <SceneCard question={question} />
          <p className="text-[13px] font-semibold text-ink-500">
            答えを選んでください
          </p>
          <ChoiceList
            choices={question.choices}
            selectedChoiceId={selectedChoiceId}
            onSelect={handleSelectChoice}
          />
        </div>
      </main>
      <BottomBar
        topSlot={
          isHintShown && (
            <output
              aria-live="polite"
              className="mx-4 mb-2 block rounded-2xl bg-white p-4 text-[13px] text-ink-700 shadow-sm"
            >
              {question.hint}
            </output>
          )
        }
      >
        <Button
          type="button"
          aria-pressed={isHintShown}
          onClick={handleToggleHint}
          // `#FFF4ED` (warn 系の薄 tint) と `text-warn` は english.ui.json `hintBtn` 個別指定色のため
          // arbitrary value で直書きする (デザイントークン化は再利用要件が見えてから)
          className="h-13 gap-1.5 rounded-4xl bg-[#FFF4ED] px-4.5 text-sm font-semibold text-warn hover:bg-[#FFF4ED]/90"
        >
          <Lightbulb aria-hidden className="size-4" />
          ヒント
        </Button>
        <Button
          type="button"
          disabled={isAnswerDisabled}
          onClick={handleSubmit}
          className={cn(
            'h-13 flex-1 rounded-4xl text-base font-bold text-white',
            isAnswerDisabled
              ? 'bg-[#C5D5E4] hover:bg-[#C5D5E4]'
              : 'bg-primary-alt hover:bg-primary-alt/90',
          )}
        >
          答えを確認する
        </Button>
      </BottomBar>
    </>
  )
}
