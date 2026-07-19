import type { Metadata } from 'next'

import { QuestionsContent } from '@/features/weakness-workbook'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '苦手問題集',
  description:
    '会話練習で間違えた表現や苦手な文法を、今週の復習セットとしてまとめて解き直せます。',
}

// (main)/questions ページのエントリ。Server Component のまま保ち、
// Suspense / Error Boundary は同ディレクトリの loading.tsx / error.tsx に App Router 規約で委譲する
export default function QuestionsPage() {
  return <QuestionsContent />
}
