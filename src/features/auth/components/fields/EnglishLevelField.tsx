'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui'
import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form'
import { EnglishLevelToggle } from '../EnglishLevelToggle'

interface EnglishLevelFieldProps<T extends FieldValues> {
  control: Control<T>
  // EnglishLevelToggle が value: number を要求するため、FieldPathByValue で
  // 「値が number のフィールド」のみに name の候補を絞り、型安全に紐付ける
  name: FieldPathByValue<T, number>
  label: string
}

// auth フォーム (Register) の英語レベル選択用 RHF 連携コンポーネント。
// EnglishLevelToggle (静的選択肢の横並び3pill) を FormField でラップする
export function EnglishLevelField<T extends FieldValues>({
  control,
  name,
  label,
}: EnglishLevelFieldProps<T>) {
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
            <EnglishLevelToggle value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
