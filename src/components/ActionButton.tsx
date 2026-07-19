import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

interface ActionButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
  // 背景色クラス。デフォルト brand 青。register など色違いを使う画面で上書き
  bgClassName?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

// アプリ共通の全幅 CTA ボタン (h-14 / rounded-[28px] / 16/700 white)。
// english.ui.json `primaryButton` (5 箇所) + login/register の loginBtn/registerBtn を統合した SSoT。
// 色違い (register の orange など) は bgClassName で上書きする
export function ActionButton({
  isLoading,
  disabled,
  children,
  className,
  bgClassName = 'bg-brand hover:bg-brand/90',
  leadingIcon,
  trailingIcon,
  type = 'button',
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        'flex h-14 w-full items-center justify-center gap-2 rounded-[28px] text-[16px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60',
        bgClassName,
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}
