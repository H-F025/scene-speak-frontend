'use client'

import { ActionButton } from '@/components'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { Controller, type UseFormReturn } from 'react-hook-form'

import type { EnglishLevelFormInput } from '../schemas/englishLevel'
import type { EnglishLevelOption } from '../types/englishLevel'
import { LevelOptionCard } from './LevelOptionCard'

interface EnglishLevelFormProps {
  levels: EnglishLevelOption[]
  form: UseFormReturn<EnglishLevelFormInput>
  handleSubmit: () => void
  isPending: boolean
}

// 英語レベル設定フォーム (presentational)。状態・副作用は useEnglishLevelForm に集約済み。
// 単一選択は base-ui ToggleGroup を流用 (register の EnglishLevelToggle と同方針)。
// ToggleGroup は単一選択でも value を string[] で扱うため、配列末尾を RHF の number に変換する
export function EnglishLevelForm({
  levels,
  form,
  handleSubmit,
  isPending,
}: EnglishLevelFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[18px] font-semibold text-text-heading">
          あなたの英語レベルを選びましょう！
        </h2>
        <p className="text-[14px] leading-relaxed text-text-subtle">
          選んだレベルに合わせて、おすすめテーマや問題の難易度が変わります。
        </p>
      </div>

      <Controller
        control={form.control}
        name="id"
        render={({ field }) => (
          <ToggleGroup
            orientation="vertical"
            value={field.value > 0 ? [String(field.value)] : []}
            onValueChange={(next) => {
              const latest = next.length > 0 ? next[next.length - 1] : undefined
              field.onChange(latest ? Number(latest) : 0)
            }}
            aria-label="英語レベル"
            className="flex w-full flex-col gap-3"
          >
            {levels.map((level) => (
              <ToggleGroupItem
                key={level.id}
                value={String(level.id)}
                aria-label={`${level.name} ${level.description}`}
                className="h-auto w-full rounded-[16px] bg-transparent p-0"
              >
                <LevelOptionCard
                  option={level}
                  selected={field.value === level.id}
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      />

      <ActionButton type="submit" isLoading={isPending}>
        このレベルで保存する
      </ActionButton>
    </form>
  )
}
