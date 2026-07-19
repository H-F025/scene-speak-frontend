import { LoadingScreen } from '@/components'

// App Router の root loading 規約ファイル。
// 任意のセグメントで Server Component の初回ロード中、自動的に Suspense fallback として表示される。
// ページ固有の loading 表示が必要な場合は、各ルート配下に独自の loading.tsx を置いて上書きする
export default function Loading() {
  return <LoadingScreen />
}
