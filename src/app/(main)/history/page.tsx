import type { Metadata } from 'next'

import { HistoryContent } from '@/features/history'

// 認証ユーザー固有データ (year_month 別の履歴) を扱うため静的プリレンダリングを無効化し、常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '学習履歴',
  description:
    'これまでの学習履歴と、連続日数・会話数・総学習時間の統計を確認できます。',
}

// (main)/history ページのエントリ。データ取得を伴う HistoryContent (Client) を呼ぶだけの薄い構造。
// pending / error は useSuspenseQuery 経由で root の loading.tsx / error.tsx boundary に委譲する (themes/home と同方針)
export default function HistoryPage() {
  return <HistoryContent />
}
