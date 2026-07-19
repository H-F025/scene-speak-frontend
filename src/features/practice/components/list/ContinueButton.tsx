'use client'

import { useRouter } from 'next/navigation'

import { ActionButton } from '@/components'
import { BottomBar } from '@/components/BottomBar'
import { themeQuestionPath } from '@/shared/lib/constants'

interface ContinueButtonProps {
  // 次に解く問題の id。全問完了時は null (このコンポーネントは null を return)
  nextQuestionId: number | null
  themeLevelId: number
  // 完了済み問題数。0 のときは「この問題集を始める」、それ以外は「続きから始める」に切り替える
  completedCount: number
}

// 下部固定 CTA。全問完了時は何も描画しない (= 親側で条件分岐せず、本コンポーネント内で完結させる)。
// 2026-06-05 リデザインで生 div + Link → BottomBar + ActionButton (router.push) に置換
export function ContinueButton({
  nextQuestionId,
  themeLevelId,
  completedCount,
}: ContinueButtonProps) {
  const { push } = useRouter()
  if (nextQuestionId === null) return null

  const label = completedCount === 0 ? 'この問題集を始める' : '続きから始める'

  return (
    <BottomBar>
      <ActionButton
        onClick={() => push(themeQuestionPath(themeLevelId, nextQuestionId))}
      >
        {label}
      </ActionButton>
    </BottomBar>
  )
}
