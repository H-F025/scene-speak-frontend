'use client'

import { useRouter } from 'next/navigation'

import { ActionButton } from '@/components'
import { ROUTES } from '@/shared/lib/constants'

// 「会話を始める」CTA。
export function HomeStartConversationButton() {
  const { push } = useRouter()

  return (
    <ActionButton
      onClick={() => push(ROUTES.THEMES)}
      aria-label="会話を始める"
      className="shadow-md"
      leadingIcon={
        <span aria-hidden className="text-[22px]">
          🎙
        </span>
      }
    >
      会話を始める
    </ActionButton>
  )
}
