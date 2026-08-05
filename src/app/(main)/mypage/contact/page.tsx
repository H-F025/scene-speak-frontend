import type { Metadata } from 'next'

import { ContactContent } from '@/features/account'

// 認証ユーザー固有データ (氏名 / メールアドレスの初期値) を扱うため静的プリレンダリングを無効化し、
// 常に動的レンダリングする。データは (main)/layout.tsx が解決済みの useUser キャッシュを再利用する
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'ご質問・ご要望・不具合報告など、お問い合わせフォームからご連絡いただけます。',
}

// (main)/mypage/contact ページのエントリ。Server Component のまま保ち、
// データ取得を伴う ContactContent (Client) を子として配置するだけの薄い構造にする
export default function ContactPage() {
  return <ContactContent />
}
