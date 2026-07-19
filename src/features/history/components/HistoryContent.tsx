'use client'

import { useHistoryQuery } from '../api'
import { useHistoryMonth } from '../hooks'
import type { HistoryResponse } from '../types/history'
import { HistoryEmpty } from './HistoryEmpty'
import { HistoryList } from './HistoryList'
import { StatsRow } from './StatsRow'

// 全期間で一切活動が無い (= 全期間履歴なし) かどうか。
// streak / 会話数がともに 0 のときのみ「まだ学習履歴がありません」を出し、
// それ以外 (過去に履歴あり・当月や選択月だけ空) は「この月の学習履歴はありません」を出す
const hasNoActivity = (summary: HistoryResponse['study_summary']) =>
  summary.streak_days === 0 && summary.conversation_count === 0

// 学習履歴画面の Container Component。
// 選択年月は URL クエリ `?month=YYYY-MM` を SSoT とし (useHistoryMonth)、useSuspenseQuery で取得する。
// pending は app/loading.tsx、error は app/error.tsx の boundary に委譲する (themes と同方針)。
// ヘッダー (カレンダーボタン + 年月シート) は (main)/layout.tsx 側の <HistoryHeader> が担う。
export function HistoryContent() {
  const { yearMonth } = useHistoryMonth()
  const { data } = useHistoryQuery({ yearMonth })

  return (
    // 画面高 - Header(56px) - TabBar(95px) に高さを固定し、リスト領域 (flex-1) を残り高さいっぱいに伸ばす。
    // 統計カードは常時表示し、超過分のみリスト内スクロールにすることで TabBar との間の余白を抑える
    <div className="flex h-[calc(100svh-151px)] min-h-0 flex-col gap-5 p-5">
      <StatsRow summary={data.study_summary} />
      {data.history_groups.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <HistoryList groups={data.history_groups} />
        </div>
      ) : (
        <HistoryEmpty
          variant={hasNoActivity(data.study_summary) ? 'all' : 'month'}
        />
      )}
    </div>
  )
}
