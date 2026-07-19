'use client'

import { HTTP_STATUS, ROUTES } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRegister } from '../api'
import { REGISTER_FORM_DEFAULT_VALUES } from '../constants'
import { registerSchema, type RegisterInput } from '../schemas/register'

// RegisterForm の状態・副作用ロジックを集約。RegisterForm 自体は presentational に保つ。
// バリデーションは zod (registerSchema) を Single Source of Truth とし、
// バックエンドの 422 (FormRequest 自動応答) は実質発生しない前提でハンドリングしない。
// 想定外の 422 が出た場合は共通トースト経由で「入力内容に誤りがあります」が表示される
export function useRegisterForm() {
  const { push } = useRouter()
  const { mutate, isPending } = useRegister()

  // mode: 'onSubmit' で onBlur/onChange のバリデーション発火を抑止 (仕様: ボタン押下時のみ実行)
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
  })

  const handleSubmit = form.handleSubmit((values) => {
    // 再送信時に前回の root エラーを残さない
    form.clearErrors('root')
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message)
        push(ROUTES.HOME)
      },
      // 409 → root エラー / 5xx 等 → 共通トースト
      onError: createFormErrorHandler(form, {
        rootStatuses: [HTTP_STATUS.CONFLICT],
      }),
    })
  })

  return {
    form,
    handleSubmit,
    isPending,
    rootError: form.formState.errors.root?.message,
  }
}
