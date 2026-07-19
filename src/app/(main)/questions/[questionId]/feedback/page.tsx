import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { FeedbackContent } from '@/features/feedback'

// 認証ユーザー固有データ (useSuspenseQuery が build 時に呼ばれて API 接続失敗するのを回避) を扱うため
// 静的プリレンダリングを無効化して常に動的レンダリングする
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '添削フィードバック',
  description: '回答結果の添削フィードバックを表示します。',
}

interface FeedbackPageProps {
  // Next.js 15 から params / searchParams は Promise でラップされる
  params: Promise<{ questionId: string }>
  searchParams: Promise<{ attemptId?: string; themeLevelId?: string }>
}

// (main)/questions/[questionId]/feedback ページのエントリ。
// 経路は questionId、attemptId / themeLevelId はクエリで前画面 (answer 送信レスポンス) から引き継ぐ。
// attemptId / themeLevelId 欠如は仕様外のため Error Boundary (error.tsx) に throw し、UX 上はリロード前提なし
export default async function FeedbackPage({
  params,
  searchParams,
}: FeedbackPageProps) {
  // params と searchParams は互いに独立しているため Promise.all で並列解決させる
  const [
    { questionId: questionIdParam },
    { attemptId: attemptIdParam, themeLevelId: themeLevelIdParam },
  ] = await Promise.all([params, searchParams])

  const questionId = Number(questionIdParam)
  if (!Number.isInteger(questionId) || questionId <= 0) {
    notFound()
  }

  const attemptId = Number(attemptIdParam)
  if (!Number.isInteger(attemptId) || attemptId <= 0) {
    throw new Error('attemptId クエリが指定されていません')
  }

  const themeLevelId = Number(themeLevelIdParam)
  if (!Number.isInteger(themeLevelId) || themeLevelId <= 0) {
    throw new Error('themeLevelId クエリが指定されていません')
  }

  return <FeedbackContent attemptId={attemptId} themeLevelId={themeLevelId} />
}
