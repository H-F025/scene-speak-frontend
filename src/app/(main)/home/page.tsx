import type { Metadata } from 'next'

import { HomeContent } from '@/features/home'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする。
// SSR/RSC での prefetch + HydrationBoundary は spec の考慮事項通り将来の最適化として扱う
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ホーム',
  description:
    '連続学習日数や本日の学習時間、おすすめテーマから今日の英会話学習を始められます。',
}

// (main)/home ページのエントリ。Server Component のまま保ち、Suspense / Error Boundary は
// 同ディレクトリの loading.tsx / error.tsx に App Router の規約で委譲する。
// データ取得を伴う HomeContent (Client) を子として配置するだけの薄い構造にする
export default function HomePage() {
  return <HomeContent />
}
