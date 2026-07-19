'use client'

import { LoadingScreen, TabBar } from '@/components'
import { useUser } from '@/features/auth'

import { MainHeader } from './_components/MainHeader'

// (main) ルートグループの共通レイアウト。
// 「本物の認証検証」をここで一括して行い、未認証 / セッション失効時は LoadingScreen を出しつつ
// apiClient interceptor 経由でフルリロード /login へ抜けさせる。
// Header の pathname 別解決ロジックは MainHeader に集約 (複数 feature を束ねる app 層の責務)。
// CC だが children は RSC payload としてそのまま受け取れるため、配下の page.tsx は SC のままで OK
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isPending } = useUser()

  // pending: 初回 /me fetch 中。
  // !user: fetch エラー (401 を含む) で apiClient interceptor がフルリロードを開始した直後の一瞬。
  // いずれも children を render せず LoadingScreen を出すことで、未認証状態で保護ページが描画されることを防ぐ
  if (isPending || !user) return <LoadingScreen />

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-97.5 flex-col">
      {/* Header / TabBar は sticky で flex flow 内に配置 (children 側で pt/pb 補正は不要) */}
      <MainHeader />
      <div className="flex-1">{children}</div>
      <TabBar />
    </div>
  )
}
