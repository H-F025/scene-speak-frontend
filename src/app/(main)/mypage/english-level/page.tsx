import type { Metadata } from 'next'

import { EnglishLevelContent } from '@/features/account'

// 認証ユーザー固有データ (現在の英語レベル) を扱うため静的プリレンダリングを無効化し、常に動的レンダリングする。
// マスタ一覧は useEnglishLevels、現在レベルは (main)/layout.tsx 解決済みの useUser キャッシュを再利用する
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '英語レベル設定',
  description:
    '現在の英語レベルを変更します。選んだレベルに合わせておすすめテーマや問題の難易度が変わります。',
}

// (main)/mypage/english-level ページのエントリ。Server Component のまま保ち、
// データ取得を伴う EnglishLevelContent (Client) を子として配置するだけの薄い構造にする
export default function EnglishLevelPage() {
  return <EnglishLevelContent />
}
