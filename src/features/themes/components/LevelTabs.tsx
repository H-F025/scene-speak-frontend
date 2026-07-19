'use client'

import { Button } from '@/components/ui'
import { cn } from '@/shared/lib/utils'

import type { EnglishLevel } from '../schemas/englishLevel'

// タブ表示順 + ラベル定義。
// 「初級・中級・上級」3 タブは画面仕様書 + API 仕様 (english_level: beginner|intermediate|advanced) に整合。
// LevelTabs 内でしか使わないため colocation (1 箇所利用の定数は別ファイル抽出しない・YAGNI)
const LEVEL_TABS: ReadonlyArray<{ level: EnglishLevel; label: string }> = [
  { level: 'beginner', label: '初級' },
  { level: 'intermediate', label: '中級' },
  { level: 'advanced', label: '上級' },
]

interface LevelTabsProps {
  // 表示時点で必ず確定したうユーザーの英語レベルを受け取る (URL クエリ未指定時は ThemesContent 側で
  // useUser().user.english_level をフォールバックとして渡すため undefined は来ない)
  current: EnglishLevel
  onChange: (level: EnglishLevel) => void
}

// 英語レベル絞り込みタブ。
// pill 形状 (radius 28 / bg primary-50 / height 48) に 3 つのタブを内包し、選択中は青背景 + 白文字。
// WAI-ARIA Tabs パターン (role="tablist" / role="tab" / aria-selected) に準拠し、
// キーボード操作 (Tab で focus、Enter/Space で onChange) に対応する
export function LevelTabs({ current, onChange }: LevelTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="英語レベル"
      className="flex h-12 items-center gap-1 rounded-[28px] bg-white p-1"
    >
      {LEVEL_TABS.map(({ level, label }) => {
        const isActive = current === level

        return (
          <Button
            key={level}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={isActive}
            onClick={() => onChange(level)}
            // Button defaults (h-8 / px-2.5 / rounded-lg / hover:bg-muted) を override してタブ pill に合わせる
            className={cn(
              'h-full flex-1 rounded-3xl text-[13px] transition-colors',
              isActive
                ? 'pointer-events-none bg-[#2563EB] font-bold text-white'
                : 'font-semibold text-text-muted-alt hover:bg-transparent',
            )}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}
