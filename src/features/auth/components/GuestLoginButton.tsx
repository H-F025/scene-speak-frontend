'use client'

import { ActionButton } from '@/components'
import { Loader2 } from '@/components/icons'
import { cn } from '@/shared/lib/utils'

import { useGuestLogin } from '../hooks'

interface GuestLoginButtonProps {
  // compact: TOP ヘッダーの pill ナビボタン / cta: ファーストビューの大型 CTA (ActionButton)
  variant?: 'compact' | 'cta'
  className?: string
}

// アカウント作成なしで固定デモアカウントに即ログインする CTA。
// 通信中の連打防止・エラートーストは useGuestLogin に集約し、本コンポーネントは見た目の出し分けのみ担う
export function GuestLoginButton({
  variant = 'cta',
  className,
}: GuestLoginButtonProps) {
  const { handleGuestLogin, isPending } = useGuestLogin()

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={isPending}
        aria-busy={isPending}
        className={cn(
          'inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border-muted bg-white px-3.5 text-[13px] font-semibold whitespace-nowrap text-text-heading transition-colors hover:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-60 sm:px-4',
          className,
        )}
      >
        {isPending && <Loader2 aria-hidden className="size-3.5 animate-spin" />}
        ゲストログイン
      </button>
    )
  }

  return (
    <ActionButton
      type="button"
      onClick={handleGuestLogin}
      isLoading={isPending}
      bgClassName="bg-white hover:bg-bg-subtle border border-border-muted"
      className={cn('text-brand-dark', className)}
      leadingIcon={
        isPending ? (
          <Loader2 aria-hidden className="size-5 animate-spin" />
        ) : undefined
      }
    >
      {isPending ? 'ログイン中…' : 'ゲストとして試す'}
    </ActionButton>
  )
}
