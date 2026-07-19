import Link from 'next/link'

import { Circle, CircleCheck, CircleDot } from '@/components/icons'
import { themeQuestionPath } from '@/shared/lib/constants'

import type { QuestionListItem } from '../../types/themeQuestions'

interface QuestionRowProps {
  question: QuestionListItem
  // 最初の未完了問題かどうか。Container 側で questions.findIndex で算出した値を流す
  isNext: boolean
  themeLevelId: number
}

const STATUS_LABEL = {
  completed: '完了',
  next: '次に解く問題',
  pending: '未着手',
} as const

export function QuestionRow({
  question,
  isNext,
  themeLevelId,
}: QuestionRowProps) {
  const status = question.is_completed
    ? 'completed'
    : isNext
      ? 'next'
      : 'pending'

  const formattedNumber = String(question.number).padStart(2, '0')

  return (
    <Link
      href={themeQuestionPath(themeLevelId, question.id)}
      aria-label={`${formattedNumber}問目 ${question.title} (${STATUS_LABEL[status]})`}
      className="flex h-15 items-center gap-3 rounded-xl bg-white px-4 shadow-[0_1px_2px_#0000000D]"
    >
      <span
        aria-hidden
        className={
          status === 'pending'
            ? 'text-xs font-bold text-text-placeholder'
            : 'text-xs font-bold text-text-disabled'
        }
      >
        {formattedNumber}
      </span>
      <h3
        className={
          status === 'pending'
            ? 'flex-1 truncate text-[15px] font-medium text-text-disabled'
            : 'flex-1 truncate text-[15px] font-semibold text-text-heading'
        }
      >
        {question.title}
      </h3>
      {status === 'completed' && (
        <CircleCheck aria-hidden className="size-5.5 text-accent-green" />
      )}
      {status === 'next' && (
        <CircleDot aria-hidden className="size-5.5 text-brand" />
      )}
      {status === 'pending' && (
        <Circle aria-hidden className="size-5.5 text-border-muted" />
      )}
    </Link>
  )
}
