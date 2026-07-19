'use client'

import type { HistoryGroup } from '../types/history'
import { HistoryCard } from './HistoryCard'

interface HistoryMonthGroupProps {
  group: HistoryGroup
}

// 月見出し + その月の履歴カード群。
// year_month は BE 側で整形済み文字列 (例「2025年5月」) で返るため、そのまま表示する。
export function HistoryMonthGroup({ group }: HistoryMonthGroupProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-text-heading">
        {group.year_month}
      </h2>
      <div className="flex flex-col gap-3">
        {group.histories.map((history, index) => (
          // HistoryItem に一意 id が無く、同月内で種別/日付/タイトルが重複しうる (同じ復習を 1 日に複数回 等)。
          // サーバー返却順の静的リストでクライアント側の並び替え/フィルタも無いため、month で scope した index を安定キーとする。
          // eslint-disable-next-line react-doctor/no-array-index-as-key -- 一意 id 不在の静的リストにおける妥当な index 利用
          <HistoryCard key={`${group.year_month}-${index}`} history={history} />
        ))}
      </div>
    </section>
  )
}
