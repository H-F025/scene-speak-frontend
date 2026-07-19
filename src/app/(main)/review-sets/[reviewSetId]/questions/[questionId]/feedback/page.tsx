import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ReviewFeedbackContent } from '@/features/review'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '復習フィードバック',
  description: '復習問題の添削フィードバックを表示します。',
}

interface ReviewFeedbackPageProps {
  // Next.js 15 から params / searchParams は Promise でラップされる
  params: Promise<{ reviewSetId: string; questionId: string }>
  searchParams: Promise<{ attemptId?: string }>
}

// (main)/review-sets/[reviewSetId]/questions/[questionId]/feedback ページのエントリ。
// path 由来の reviewSetId / questionId と、クエリ attemptId (前画面 = 解答送信レスポンス由来) を受け取る。
// reviewSetId は次問題遷移の URL 構築に使い、questionId は ReviewSessionProvider との同セット紐付けで暗黙的に共有。
// attemptId 欠如は仕様外のため Error Boundary (error.tsx) に throw する
export default async function ReviewFeedbackPage({
  params,
  searchParams,
}: ReviewFeedbackPageProps) {
  const [
    { reviewSetId: reviewSetIdParam, questionId: questionIdParam },
    { attemptId: attemptIdParam },
  ] = await Promise.all([params, searchParams])

  const reviewSetId = Number(reviewSetIdParam)
  if (!Number.isInteger(reviewSetId) || reviewSetId <= 0) {
    notFound()
  }

  const questionId = Number(questionIdParam)
  if (!Number.isInteger(questionId) || questionId <= 0) {
    notFound()
  }

  const attemptId = Number(attemptIdParam)
  if (!Number.isInteger(attemptId) || attemptId <= 0) {
    throw new Error('attemptId クエリが指定されていません')
  }

  return (
    <ReviewFeedbackContent attemptId={attemptId} reviewSetId={reviewSetId} />
  )
}
