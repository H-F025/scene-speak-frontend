'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui'

import { PasswordInput } from '../PasswordInput'

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  // 'current-password' = ログイン用 / 'new-password' = 新規登録・確認用 (パスワードマネージャへの hint)
  autoComplete?: 'current-password' | 'new-password'
}

// auth フォーム (Login / Register) のパスワード入力用 RHF 連携コンポーネント。
// PasswordInput (表示/非表示切替を内包) を FormField とつなぐ
export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = '••••••••',
  autoComplete,
}: PasswordFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel className="text-[13px] font-semibold text-ink-700-alt">
            {label}
          </FormLabel>
          <FormControl>
            <PasswordInput
              placeholder={placeholder}
              autoComplete={autoComplete}
              className="h-13 rounded-xl border-[1.5px] border-primary-100 px-4 py-0 text-[15px] placeholder:text-[15px] placeholder:text-ink-400-alt md:text-[15px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
