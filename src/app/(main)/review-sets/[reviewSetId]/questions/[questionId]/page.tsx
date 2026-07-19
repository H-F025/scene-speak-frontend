import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ReviewProblemContent } from '@/features/review'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '復習問題回答',
  description: '今週の復習セットの問題に回答して、苦手分野を克服しましょう。',
}

interface ReviewQuestionPageProps {
  // Next.js 15 から params は Promise でラップされる。
  // 動的セグメント名 ([reviewSetId] / [questionId]) はディレクトリ名由来。
  // 実体は review_sets.id / review_set_questions.id の PK
  params: Promise<{ reviewSetId: string; questionId: string }>
}

// (main)/review-sets/[reviewSetId]/questions/[questionId] ページのエントリ。
// path 引数を string → number 化し、不正値 (NaN / 0 以下) は notFound() で 404 ページへ。
// 学習セッション開始 / 問題取得 / 解答送信 / heartbeat / 中断 finish の lifecycle は
// ReviewProblemContent (Client) が一元管理する。
// 戻る・QuestionCountBadge は (main)/layout.tsx の動的 Header (DynamicReviewProblemHeader) 側で描画される
export default async function ReviewQuestionPage({
  params,
}: ReviewQuestionPageProps) {
  const { reviewSetId: reviewSetIdParam, questionId: questionIdParam } =
    await params
  const reviewSetId = Number(reviewSetIdParam)
  const reviewSetQuestionId = Number(questionIdParam)

  if (
    !Number.isInteger(reviewSetId) ||
    reviewSetId <= 0 ||
    !Number.isInteger(reviewSetQuestionId) ||
    reviewSetQuestionId <= 0
  ) {
    notFound()
  }

  return (
    <ReviewProblemContent
      reviewSetId={reviewSetId}
      reviewSetQuestionId={reviewSetQuestionId}
    />
  )
}
