// 時刻ベースのあいさつ文を導出する。
// 5-10時:「おはようございます」/ 11-16時:「こんにちは」/ それ以外:「こんばんは」
// state を持たず、レンダリング時点の `new Date()` から計算する派生値のみ返す。
const MORNING_START_HOUR = 5
const MORNING_END_HOUR = 10
const AFTERNOON_END_HOUR = 16

export const useGreeting = (): { greeting: string } => {
  const hour = new Date().getHours()

  if (hour >= MORNING_START_HOUR && hour <= MORNING_END_HOUR) {
    return { greeting: 'おはようございます' }
  }
  if (hour > MORNING_END_HOUR && hour <= AFTERNOON_END_HOUR) {
    return { greeting: 'こんにちは' }
  }
  return { greeting: 'こんばんは' }
}
