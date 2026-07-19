'use client'

import { ROUTES } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useUpdateEnglishLevel } from '../api'
import {
  englishLevelFormSchema,
  type EnglishLevelFormInput,
} from '../schemas/englishLevel'

// EnglishLevelForm の状態・副作用ロジックを集約。コンポーネントは presentational に保つ。
// defaultLevelId は現在のユーザーレベル (code→id 変換済み) を Content から受け取り初期選択にする。
// user キャッシュの invalidate は useUpdateEnglishLevel 側で行うため、ここでは成功トースト + 遷移のみ担う
export function useEnglishLevelForm(defaultLevelId: number) {
  const { push } = useRouter()
  const { mutate, isPending } = useUpdateEnglishLevel()

  // mode: 'onSubmit' で onChange のバリデーション発火を抑止 (保存押下時のみ検証)
  const form = useForm<EnglishLevelFormInput>({
    resolver: zodResolver(englishLevelFormSchema),
    mode: 'onSubmit',
    defaultValues: { id: defaultLevelId },
  })

  const handleSubmit = form.handleSubmit((values) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message)
        push(ROUTES.MYPAGE)
      },
      // 404 等 → 共通トースト (BE message が SSoT)。zod が未選択をブロックするため root エラーは不要
      onError: createFormErrorHandler(form),
    })
  })

  return { form, handleSubmit, isPending }
}
