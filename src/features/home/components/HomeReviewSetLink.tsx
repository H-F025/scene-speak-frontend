'use client'

import Link from 'next/link'

import { Dumbbell } from '@/components/icons'
import { ROUTES } from '@/shared/lib/constants'

interface HomeReviewSetLinkProps {
  hasReviewSet: boolean
}

// 苦手問題集導線 (english.ui.json continueRow)。`has_review_set === true` のときのみ表示する。
// 行全体を 1 つのリンクとしてタップ可能にし、左側 36x36 円内に Dumbbell icon を配置
export function HomeReviewSetLink({ hasReviewSet }: HomeReviewSetLinkProps) {
  if (!hasReviewSet) return null

  return (
    <Link
      href={ROUTES.QUESTIONS}
      aria-label="苦手問題集を開く"
      className="flex h-14 items-center justify-center gap-2.5 rounded-[28px] bg-accent-orange px-4 shadow-md"
    >
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-full bg-accent-orange"
      >
        <Dumbbell size={20} className="text-white" />
      </span>
      <span className="text-base font-semibold text-white">
        苦手問題集を開く
      </span>
    </Link>
  )
}
