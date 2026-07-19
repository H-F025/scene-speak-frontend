'use client'

import Link from 'next/link'

import { ROUTES } from '@/shared/lib/constants'

import type { RecommendedTheme } from '../types/home'

interface HomeRecommendedThemeProps {
  theme: RecommendedTheme | null
}

// 今日のおすすめテーマカード。recommended_theme が null の場合はセクションごと非表示にする。
// estimated_time_label は BE 側でフォーマット済み (例: "約10分" / estimated_minutes が null のときは "制限なし")。
// english.ui.json の recommendCard 仕様に準拠: 見出し「今日のおすすめ ✨」はカード**内**の first child として
// 白文字で表示する (旧実装の section 外 h2 構造から変更)
export function HomeRecommendedTheme({ theme }: HomeRecommendedThemeProps) {
  if (!theme) return null

  const themeQuestionsHref = `${ROUTES.THEMES}/${theme.theme_id}/questions`

  return (
    <Link
      href={themeQuestionsHref}
      aria-label={`今日のおすすめ ${theme.name} を始める`}
      className="flex flex-col gap-2.5 rounded-[20px] bg-link p-5 shadow-md"
    >
      <h2 className="text-[15px] font-semibold text-white">
        今日のおすすめ <span aria-hidden>✨</span>
      </h2>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[18px] font-semibold text-white">
          <span aria-hidden>☕</span> {theme.name}
        </h3>
        <span className="rounded-xl bg-accent-orange px-2.5 py-1 text-[11px] font-semibold text-white">
          {theme.english_level_label}
        </span>
      </div>
      <p className="text-[13px] text-border-brand">{theme.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#93C5FD]">
          <span aria-hidden>⏱</span> {theme.estimated_time_label}
        </p>
        <p className="text-[13px] font-semibold text-white">→ 始める</p>
      </div>
    </Link>
  )
}
