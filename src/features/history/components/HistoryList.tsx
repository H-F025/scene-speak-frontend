'use client'

import type { HistoryGroup } from '../types/history'
import { HistoryMonthGroup } from './HistoryMonthGroup'

interface HistoryListProps {
  groups: HistoryGroup[]
}

// 月グループのリスト。year_month は BE 内で一意のため key に使える
export function HistoryList({ groups }: HistoryListProps) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <HistoryMonthGroup key={group.year_month} group={group} />
      ))}
    </div>
  )
}
