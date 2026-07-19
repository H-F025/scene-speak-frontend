'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { ENGLISH_LEVEL_OPTIONS } from '../constants'

interface EnglishLevelToggleProps {
  value: number
  onChange: (value: number) => void
  // FormControl が cloneElement で注入する props (form の aria 連携用)
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

export function EnglishLevelToggle({
  value,
  onChange,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: EnglishLevelToggleProps) {
  // base-ui の ToggleGroup は単一選択でも value を string[] で扱う。
  // 未選択は空配列、選択中は配列に1件。配列末尾の値を採用して RHF の number に変換する
  const handleValueChange = (next: string[]) => {
    const latest = next.length > 0 ? next[next.length - 1] : undefined
    onChange(latest ? Number(latest) : 0)
  }

  return (
    <ToggleGroup
      id={id}
      value={value > 0 ? [String(value)] : []}
      onValueChange={handleValueChange}
      aria-label="英語レベル"
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      className="flex w-full gap-2"
    >
      {ENGLISH_LEVEL_OPTIONS.map((option) => (
        // base-ui の Toggle は選択状態を data-pressed / aria-pressed で表すため両方で色を切り替える
        <ToggleGroupItem
          key={option.id}
          value={String(option.id)}
          aria-label={option.label}
          className="h-11 flex-1 rounded-full border-[1.5px] border-primary-100 px-2 text-[14px] text-ink-600-alt data-pressed:border-primary-alt data-pressed:bg-primary-alt data-pressed:text-white aria-pressed:border-primary-alt aria-pressed:bg-primary-alt aria-pressed:text-white"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
