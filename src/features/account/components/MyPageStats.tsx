'use client'

import { StatCard } from '@/components'

interface MyPageStatsProps {
  consecutiveDays: number
  conversationCount: number
  studyTimeLabel: string
}

// 学習実績の 3 カード (連続日数 / 会話数 / 学習時間) を横並びで表示する。
// StatCard は共通 primitive (src/components)。値の色はカード毎に異なるため valueClassName で渡す。
// english.ui.json statsRow 仕様: 🔥=$accent-orange / 💬=$brand / ⏱=$accent-green
export function MyPageStats({
  consecutiveDays,
  conversationCount,
  studyTimeLabel,
}: MyPageStatsProps) {
  return (
    <section className="flex gap-2.5">
      <StatCard
        emoji="🔥"
        value={consecutiveDays}
        label="連続日数"
        valueClassName="text-accent-orange"
      />
      <StatCard
        emoji="💬"
        value={conversationCount}
        label="会話数"
        valueClassName="text-brand"
      />
      <StatCard
        emoji="⏱"
        value={studyTimeLabel}
        label="学習時間"
        valueClassName="text-accent-green"
      />
    </section>
  )
}
