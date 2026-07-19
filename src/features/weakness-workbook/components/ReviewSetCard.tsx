import { Target } from '@/components/icons'

import type { ReviewSetPriority } from '../types/reviewSet'

// 復習可能な priority (spec の優先度マッピング: 1問以上で必ず low/medium/high のいずれか)。
// 'non' は呼び出し側 (QuestionsContent) で ReviewSetEmpty に分岐される前提
type ReviewablePriority = Exclude<ReviewSetPriority, 'non'>

// 優先度 → プログレスバー幅 (%)。spec 受け入れ条件の固定マッピングをそのまま表現
const PROGRESS_PERCENT_BY_PRIORITY: Record<ReviewablePriority, number> = {
  low: 33,
  medium: 66,
  high: 100,
}

interface ReviewSetCardProps {
  questionCount: number
  priority: ReviewablePriority
  priorityLabel: string | null
  estimatedMinutes: string
}

// 「今週の復習セット」カード。
// priority_label / estimated_minutes は BE フォーマット済み文字列をそのまま表示する
// (FE 側で秒→分変換しない・SSoT 原則)
export function ReviewSetCard({
  questionCount,
  priority,
  priorityLabel,
  estimatedMinutes,
}: ReviewSetCardProps) {
  const progressPercent = PROGRESS_PERCENT_BY_PRIORITY[priority]

  return (
    <section className="flex flex-col gap-2.5 rounded-[20px] bg-white p-3.5">
      <div className="flex items-center">
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-[20px] bg-brand-soft"
        >
          <Target className="size-5 text-brand" />
        </div>
        <div className="flex flex-col gap-1 pl-3">
          <p className="text-xs font-semibold text-ink-500">今週の復習セット</p>
          <h3 className="text-[17px] font-semibold text-ink-900">
            間違いが多い表現を{questionCount}問にまとめました
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          role="progressbar"
          aria-label="復習優先度"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2.5 rounded-full bg-border-soft"
        >
          <div
            aria-hidden
            className="h-full rounded-full bg-accent-green"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-accent-green">
            復習優先度 {priorityLabel}
          </p>
          <p className="text-xs text-ink-500">
            所要時間 約{estimatedMinutes}分
          </p>
        </div>
      </div>
    </section>
  )
}
