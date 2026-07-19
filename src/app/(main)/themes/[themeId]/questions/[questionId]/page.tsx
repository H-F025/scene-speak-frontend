import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ThemeProblemContent } from '@/features/practice'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '問題回答',
  description:
    'シーンに沿った 4 択問題に回答して、瞬発的な英語表現力を鍛えましょう。',
}

interface ThemeQuestionPageProps {
  // Next.js 15 から params は Promise でラップされる。
  // 動的セグメント名 ([themeId] / [questionId]) はディレクトリ名由来。
  // 実体は theme_levels.id / questions.id の PK
  params: Promise<{ themeId: string; questionId: string }>
}

// (main)/themes/[themeId]/questions/[questionId] ページのエントリ。
// path 引数を string → number 化し、不正値 (NaN / 0 以下) は notFound() で 404 ページへ。
// 学習セッション開始 / 問題取得 / 解答送信 / heartbeat / 中断 finish の lifecycle は
// ThemeProblemContent (Client) が一元管理する。
// 戻る・QuestionCountBadge は (main)/layout.tsx の動的 Header (DynamicProblemQuestionHeader) 側で描画される
export default async function ThemeQuestionPage({
  params,
}: ThemeQuestionPageProps) {
  const { themeId: themeLevelIdParam, questionId: questionIdParam } =
    await params
  const themeLevelId = Number(themeLevelIdParam)
  const questionId = Number(questionIdParam)

  if (
    !Number.isInteger(themeLevelId) ||
    themeLevelId <= 0 ||
    !Number.isInteger(questionId) ||
    questionId <= 0
  ) {
    notFound()
  }

  return (
    <ThemeProblemContent themeLevelId={themeLevelId} questionId={questionId} />
  )
}
