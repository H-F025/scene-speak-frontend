import type { Metadata } from 'next'

import { MyPageContent } from '@/features/account'

// 認証ユーザー固有データ (プロフィール / 学習サマリー) を扱うため静的プリレンダリングを無効化し、
// 常に動的レンダリングする。データは (main)/layout.tsx が解決済みの useUser キャッシュを再利用する
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'マイページ',
  description:
    'プロフィール・学習実績の確認、英語レベル設定やログアウトができます。',
}

// (main)/mypage ページのエントリ。Server Component のまま保ち、
// データ取得を伴う MyPageContent (Client) を子として配置するだけの薄い構造にする
export default function MyPage() {
  return <MyPageContent />
}
