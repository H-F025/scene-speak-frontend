import type { EnglishLevel } from '../schemas/englishLevel'

// テーマカード右上のレベルバッジ色。
// 難易度の慣例色に沿ってレベル別に分岐 (beginner=green / intermediate=amber / advanced=red)
export interface EnglishLevelBadgeStyle {
  bgColor: string
  textColor: string
}

export const ENGLISH_LEVEL_BADGE_STYLE: Readonly<
  Record<EnglishLevel, EnglishLevelBadgeStyle>
> = {
  beginner: { bgColor: '#DCFCE7', textColor: '#16A34A' },
  intermediate: { bgColor: '#FEF3C7', textColor: '#D97706' },
  advanced: { bgColor: '#FEE2E2', textColor: '#DC2626' },
}
