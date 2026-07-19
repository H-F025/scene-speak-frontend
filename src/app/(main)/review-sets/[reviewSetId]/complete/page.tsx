import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ReviewCompleteContent } from '@/features/review'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '復習完了',
  description: '復習セットの結果と次のおすすめを表示します。',
}

interface ReviewCompletePageProps {
  // Next.js 15 から params は Promise でラップされる
  params: Promise<{ reviewSetId: string }>
}

// (main)/review-sets/[reviewSetId]/complete ページのエントリ。
// path 由来の reviewSetId のみを受け取り、Container へ薄く委譲する。
// ReviewSessionProvider は親 layout (`[reviewSetId]/layout.tsx`) が提供するため本ページではマウントしない
export default async function ReviewCompletePage({
  params,
}: ReviewCompletePageProps) {
  const { reviewSetId: reviewSetIdParam } = await params

  const reviewSetId = Number(reviewSetIdParam)
  if (!Number.isInteger(reviewSetId) || reviewSetId <= 0) {
    notFound()
  }

  return <ReviewCompleteContent reviewSetId={reviewSetId} />
}
