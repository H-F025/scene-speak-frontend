'use client'

import { cn } from '@/shared/lib/utils'

interface StatCardProps {
  emoji: string
  value: string | number
  label: string
  // 数値色は statsRow 仕様でカード毎に異なる ($accent-orange / $brand / $accent-green)。
  // 呼び出し側 (各 feature の StatsRow) が Tailwind class を直接渡し、StatCard は presentational に保つ
  valueClassName: string
}

// 絵文字 + 数値 + ラベルの縦カード。
// english.ui.json statsRow の statCard 仕様 (h 123 / bg white / radius 16 / shadow / gap 6 / pad [18, 8] / 中央寄せ) に準拠。
// home / history / myPage の 3 feature で利用される primitive のため src/components/ へ昇格 (Rule of Three)。
// StatsRow 自体は domain 型 (HistoryStudySummary 等) に依存するため feature 内に残し、本カードのみ共通化する
export function StatCard({
  emoji,
  value,
  label,
  valueClassName,
}: StatCardProps) {
  return (
    <article className="flex h-30.75 flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-2 py-4.5 shadow-sm">
      <span aria-hidden className="text-[26px] leading-none">
        {emoji}
      </span>
      <span
        className={cn('text-[24px] font-bold leading-none', valueClassName)}
      >
        {value}
      </span>
      <span className="text-[11px] text-text-subtle">{label}</span>
    </article>
  )
}
