import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ProblemListContent } from '@/features/practice'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '練習問題一覧',
  description:
    '選択したテーマの練習問題と進捗を確認し、続きから学習を再開できます。',
}

interface ProblemListPageProps {
  // Next.js 15 から params は Promise でラップされる。
  // 動的セグメント名 ([themeId]) はディレクトリ名由来で歴史的経緯のまま。
  // 実体は theme_levels テーブルの PK (= Theme × EnglishLevel の組合せ) であり、
  // 内部変数は themeLevelId に正規化する
  params: Promise<{ themeId: string }>
}

// (main)/themes/[themeId]/questions ページのエントリ。
// path 引数を string → number へ変換し、不正値 (NaN) は notFound() で 404 ページへ。
// Suspense / Error Boundary は (main)/layout.tsx 経由 app/loading.tsx / app/error.tsx に委譲する。
// navbar は self-managed のため layout 側 Header はスキップされ、ProblemListContent が <Header /> を render する
export default async function ProblemListPage({
  params,
}: ProblemListPageProps) {
  const { themeId: themeLevelIdParam } = await params
  const themeLevelId = Number(themeLevelIdParam)

  if (!Number.isInteger(themeLevelId) || themeLevelId <= 0) notFound()

  return <ProblemListContent themeLevelId={themeLevelId} />
}
