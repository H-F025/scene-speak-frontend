'use client'

import { cn } from '@/shared/lib/utils'

import type { HistoryType } from '../types/history'

interface CategoryBadgeProps {
  variant: HistoryType
  label: string
}

// 履歴種別バッジ。会話練習 / 復習 の 2 種のみのため三項演算子で色分岐する。
// 色は english.ui.json / spec の固定 hex (token 化されていない種別専用色) を arbitrary value で指定
export function CategoryBadge({ variant, label }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-xl px-2.5 py-[5px] text-[11px] font-semibold',
        variant === 'review'
          ? 'bg-[#F1EFFF] text-[#6C63FF]'
          : 'bg-[#EEF5FF] text-[#2F80ED]',
      )}
    >
      {label}
    </span>
  )
}
