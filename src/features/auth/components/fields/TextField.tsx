'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email'>
  placeholder?: string
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
}

// auth フォーム (Login / Register) の text / email 入力用 RHF 連携コンポーネント。
// FormItem / FormLabel / FormControl / Input / FormMessage の定型構造を集約する
export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
}: TextFieldProps<T>) {
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
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              inputMode={inputMode}
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
