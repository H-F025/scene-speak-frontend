import { ReviewSessionProvider } from '@/features/review'

interface ReviewSetLayoutProps {
  children: React.ReactNode
  params: Promise<{ reviewSetId: string }>
}

// /review-sets/[reviewSetId]/* セグメント配下に ReviewSessionProvider をマウントする入れ子レイアウト。
// 同セット内の問題画面 → フィードバック画面 → 次問題画面の遷移はセグメント layout が再 mount されない
// 性質を利用して同一 Provider (= 同一 learning_session) を維持する。
// セット外への離脱 (= 本 layout の unmount) で finish('abandoned') が Provider 側で発火される
export default async function ReviewSetLayout({
  children,
  params,
}: ReviewSetLayoutProps) {
  const { reviewSetId } = await params
  return (
    <ReviewSessionProvider reviewSetId={Number(reviewSetId)}>
      {children}
    </ReviewSessionProvider>
  )
}
