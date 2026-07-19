import type { Metadata } from 'next'

import { ThemesContent } from '@/features/themes'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする。
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'テーマ選択',
  description:
    'カフェで注文・空港でチェックインなど、英会話シーン別のテーマから今日の練習を始められます。',
}

// (main)/themes ページのエントリ。Server Component のまま保ち、Suspense / Error Boundary は
// (main) 共通 fallback (loading.tsx / error.tsx) に委譲する (個別配置せず)
export default function ThemesPage() {
  return <ThemesContent />
}
