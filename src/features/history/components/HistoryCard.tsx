'use client'

import type { HistoryItem, HistoryType } from '../types/history'
import { CategoryBadge } from './CategoryBadge'
import { SummaryRow } from './SummaryRow'

// 履歴カードの絵文字ソース。API レスポンスに絵文字フィールドが無いため (spec 既知の制約・要確認項目)、
// history_type による固定マッピングで解決する。BE が将来絵文字を返す場合はここを差し替える
const HISTORY_TYPE_EMOJI = {
  normal: '💬',
  review: '🔁',
} as const satisfies Record<HistoryType, string>

interface HistoryCardProps {
  history: HistoryItem
}

// 1 履歴カード本体 (押下不可・遷移なし)。
// english.ui.json historyCard 仕様 (bg white / radius 16 / gap 12 / pad 16 / histIcon 44 円 + histInfo + histBadge + summaryRow) に準拠
export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-white p-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bg-subtle text-[22px]"
        >
          {HISTORY_TYPE_EMOJI[history.history_type]}
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-[15px] font-semibold text-text-heading">
            {history.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[12px] text-text-subtle">
            <span>{history.learned_on}</span>
            <span aria-hidden>·</span>
            <span>{history.study_time}</span>
          </div>
        </div>
        <CategoryBadge
          variant={history.history_type}
          label={history.type_label}
        />
      </div>
      <SummaryRow summary={history.summary} />
    </article>
  )
}
