'use client'

import { StatCard } from '@/components'

import type { HistoryStudySummary } from '../types/history'

interface StatsRowProps {
  summary: HistoryStudySummary
}

// 全期間統計の 3 カード (連続日数 / 会話数 / 総学習時間) を横並びで表示する。
// 値は全期間集計のため、月切替時も変化しない (spec 受け入れ条件)
export function StatsRow({ summary }: StatsRowProps) {
  return (
    <section className="flex gap-2.5">
      <StatCard
        emoji="🔥"
        value={summary.streak_days}
        label="連続日数"
        valueClassName="text-accent-orange"
      />
      <StatCard
        emoji="💬"
        value={summary.conversation_count}
        label="会話数"
        valueClassName="text-brand"
      />
      <StatCard
        emoji="⏱"
        value={summary.total_study_time}
        label="総学習時間"
        valueClassName="text-accent-green"
      />
    </section>
  )
}
