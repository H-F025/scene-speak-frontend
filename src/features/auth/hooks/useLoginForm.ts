'use client'

import { setAuthCookie } from '@/shared/lib/authCookie'
import { HTTP_STATUS, ROUTES } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLogin } from '../api'
import { LOGIN_FORM_DEFAULT_VALUES } from '../constants'
import { loginSchema, type LoginInput } from '../schemas/login'

// LoginForm の状態・副作用ロジックを集約。LoginForm 自体は presentational に保つ
export function useLoginForm() {
  const { push } = useRouter()
  const { mutate, isPending } = useLogin()

  // mode: 'onSubmit' で onBlur/onChange のバリデーション発火を抑止 (仕様: ボタン押下時のみ実行)
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  })

  const handleSubmit = form.handleSubmit((values) => {
    // 再送信時に前回の root エラーを残さない
    form.clearErrors('root')
    mutate(values, {
      onSuccess: (data) => {
        // middleware が認証判定する marker cookie をセット (Sanctum セッション Cookie は HttpOnly のため
        // 「存在 = 認証済み」と判定できず、フロント側で別 cookie を持って認証状態を表現する)
        setAuthCookie()
        toast.success(data.message)
        push(ROUTES.HOME)
      },
      // 401 → root エラー / 5xx 等 → 共通トースト
      onError: createFormErrorHandler(form, {
        rootStatuses: [HTTP_STATUS.UNAUTHORIZED],
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
