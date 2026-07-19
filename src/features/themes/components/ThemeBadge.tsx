import { ENGLISH_LEVEL_BADGE_STYLE } from '../constants'
import type { EnglishLevel } from '../schemas/englishLevel'

interface ThemeBadgeProps {
  level: EnglishLevel
  label: string
}

// テーマカード右上のレベルバッジ。
// 背景・文字色は english_level に応じてフロント側で分岐 (色覚特性配慮で text も保持)。
// 表示文言は API の english_level_label をそのまま受け取る (BE フォーマット済み文字列を SSoT)
export function ThemeBadge({ level, label }: ThemeBadgeProps) {
  const style = ENGLISH_LEVEL_BADGE_STYLE[level]

  return (
    <span
      className="inline-flex items-center rounded-lg px-2 py-0.75 text-[11px] font-semibold"
      style={{ backgroundColor: style.bgColor, color: style.textColor }}
    >
      {label}
    </span>
  )
}
