'use client'

import { useLogout, useUser } from '@/features/auth'

import { MyPageStats } from './MyPageStats'
import { ProfileCard } from './ProfileCard'
import { SettingsSection } from './SettingsSection'

// マイページの Container コンポーネント。
// ユーザー情報は auth の useUser を再利用する (queryKey 共有で dedup)。
// (main)/layout.tsx が描画前に useUser を解決済みのため、ここでは常にキャッシュヒットする。
// 型上 data は undefined になりうるため guard を置くが、実運用では到達しない。
// ログアウトは auth の useLogout に集約済み (mutation + cache 破棄 + /login 遷移 + 二重送信防止)
export function MyPageContent() {
  const { data } = useUser()
  const { handleLogout, isPending } = useLogout()

  if (!data) return null

  const { user, study_summary } = data

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <ProfileCard
        name={user.name}
        email={user.email}
        levelLabel={user.english_level_label}
      />
      <MyPageStats
        consecutiveDays={study_summary.consecutive_days}
        conversationCount={study_summary.conversation_count}
        studyTimeLabel={study_summary.total_study_time_label}
      />
      <SettingsSection onLogout={handleLogout} isLoggingOut={isPending} />
    </div>
  )
}
