'use client'

import { BarChart3 } from '@/components/icons'

interface SummaryRowProps {
  // BE 整形済みのサマリー文言 (例「3問学習・2問正解」)
  summary: string
}

// 履歴カード下部の学習サマリー行。
// english.ui.json summaryRow 仕様 (fill $bg-app / radius 10 / pad [10, 12] / gap 8 / bar-chart-3 + text を $brand) に準拠
export function SummaryRow({ summary }: SummaryRowProps) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] bg-bg-app px-3 py-2.5">
      <BarChart3 aria-hidden className="size-3.5 shrink-0 text-brand" />
      <span className="text-[13px] font-semibold text-brand">{summary}</span>
    </div>
  )
}
