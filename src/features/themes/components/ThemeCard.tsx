'use client'

import Link from 'next/link'

import { themeQuestionsPath } from '@/shared/lib/constants'

import { getThemeAppearance } from '../constants'
import type { Theme } from '../types/theme'

import { ThemeBadge } from './ThemeBadge'

interface ThemeCardProps {
  theme: Theme
}

// estimated_minutes は null の場合「制限なし」表示。それ以外は「約{n}分」。
// 整形は本コンポーネント内 inline で完結させる (横断利用要件がないため utility 化しない)
const formatEstimatedMinutes = (minutes: number | null): string =>
  minutes === null ? '制限なし' : `約${minutes}分`

// テーマカード。カード全体が問題画面へのリンクとして機能する (a11y: <Link> でキーボード操作対応)。
// 2026-06-05 リデザインで iconBox bg/icon 色を $bg-subtle / $link に統一 (emoji は themeAppearance から取得し続ける)。
// 遷移先 URL の path 引数には theme_level_id (= テーマ × 英語レベルの PK) を使う
export function ThemeCard({ theme }: ThemeCardProps) {
  const appearance = getThemeAppearance(theme.id)

  return (
    <Link
      href={themeQuestionsPath(theme.theme_level_id)}
      aria-label={`${theme.title} (${theme.english_level_label}) の問題を始める`}
      className="flex h-20 items-center gap-3.5 rounded-[18px] bg-white px-4 shadow-[0_2px_8px_#3B82F618]"
    >
      <div
        aria-hidden
        className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-bg-subtle text-[26px] text-link"
      >
        {appearance.emoji}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold text-text-heading">
            {theme.title}
          </h3>
          <ThemeBadge
            level={theme.english_level}
            label={theme.english_level_label}
          />
        </div>
        <p className="truncate text-xs text-text-muted-alt">
          {theme.description}
        </p>
        <p className="text-[11px] text-text-disabled">
          ⏱ {formatEstimatedMinutes(theme.estimated_minutes)}
        </p>
      </div>
    </Link>
  )
}
