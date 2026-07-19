'use client'

import { useState, type ComponentProps } from 'react'

import { Eye, EyeOff } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { cn } from '@/shared/lib/utils'

export type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'>

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const handleToggleVisible = () => setVisible((current) => !current)

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-11', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleToggleVisible}
        aria-label={visible ? 'パスワードを隠す' : 'パスワードを表示'}
        aria-pressed={visible}
        className="absolute top-1/2 right-3 size-7 -translate-y-1/2 text-ink-400-alt hover:bg-transparent hover:text-ink-600-alt focus-visible:text-ink-600-alt"
      >
        {visible ? (
          <EyeOff size={18} aria-hidden="true" />
        ) : (
          <Eye size={18} aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
