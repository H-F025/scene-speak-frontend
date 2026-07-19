// GET /api/v1/home レスポンス内の学習統計セクション。
// today_study_time は単位なしの分数文字列で返るため、表示時に FE 側で `${value}分` に組み立てる
export interface HomeStats {
  streak_days: number
  today_study_time: string
}

// GET /api/v1/home の「今日のおすすめ」セクション。recommended_theme は null になりうる (該当なし)
// english_level / english_level_label は auth feature の EnglishLevel / EnglishLevelLabel と同値域だが、
// feature 間依存を増やさないため shared/ 昇格までは string で受ける
export interface RecommendedTheme {
  theme_level_id: number
  theme_id: number
  name: string
  description: string
  english_level: string
  english_level_label: string
  estimated_minutes: number | null
  estimated_time_label: string
}

// GET /api/v1/home 200 レスポンス
export interface HomeResponse {
  user_name: string
  stats: HomeStats
  recommended_theme: RecommendedTheme | null
  has_review_set: boolean
}
