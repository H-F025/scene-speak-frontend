'use client'

import { useRouter } from 'next/navigation'

import { ActionButton } from '@/components'
import { ROUTES } from '@/shared/lib/constants'
import { showApiErrorToast } from '@/shared/lib/apiErrorToast'

import { useStartReviewSet } from '../api/useStartReviewSet'

// 「この問題集を始める」CTA。
// useStartReviewSet (純粋 mutation) を呼び、成功時のみ復習問題画面へ push する Container 寄りコンポーネント。
// 二重送信防止は mutation.isPending による disabled 制御 (CLAUDE.md 二重送信ルール準拠)。
// onError は showApiErrorToast にフル委譲 (409 / 5xx / ネットワーク全て BE message を SSoT として表示)
export function StartReviewButton() {
  const { push } = useRouter()
  const { mutate, isPending } = useStartReviewSet()

  const handleStart = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        push(
          `${ROUTES.REVIEW_SETS}/${data.review_set_id}/questions/${data.first_review_set_question_id}`,
        )
      },
      onError: (error) => {
        showApiErrorToast(error)
      },
    })
  }

  return (
    <ActionButton
      onClick={handleStart}
      isLoading={isPending}
      aria-disabled={isPending}
    >
      この問題集を始める
    </ActionButton>
  )
}
