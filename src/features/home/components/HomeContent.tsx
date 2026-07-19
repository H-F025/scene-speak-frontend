'use client'

import { useHome } from '../api'
import { HomeGreeting } from './HomeGreeting'
import { HomeRecommendedTheme } from './HomeRecommendedTheme'
import { HomeReviewSetLink } from './HomeReviewSetLink'
import { HomeStartConversationButton } from './HomeStartConversationButton'
import { HomeStats } from './HomeStats'

// ホーム画面の Container コンポーネント。
// useSuspenseQuery で home データを取得し、各 Presentational セクションに props で配る。
// pending / error は (main)/home/loading.tsx / error.tsx に委譲する
export function HomeContent() {
  const { data } = useHome()

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-5">
      <HomeGreeting userName={data.user_name} />
      <HomeStats
        streakDays={data.stats.streak_days}
        todayStudyTime={data.stats.today_study_time}
      />
      <HomeRecommendedTheme theme={data.recommended_theme} />
      <HomeStartConversationButton />
      <HomeReviewSetLink hasReviewSet={data.has_review_set} />
    </div>
  )
}
