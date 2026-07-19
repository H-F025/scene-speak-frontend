'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { showApiErrorToast } from '@/shared/lib/apiErrorToast'
import { setAuthCookie } from '@/shared/lib/authCookie'
import { ROUTES } from '@/shared/lib/constants'

import { useLogin } from '../api'
import { GUEST_LOGIN_CREDENTIALS } from '../constants'

// ゲストログイン CTA の副作用を集約。固定デモアカウントで通常のログイン API (useLogin) を叩き、
// 成功時は通常ログインと同じ marker cookie 付与 + /home 遷移を行う。
// 二重送信防止は isPending を呼び出し側の disabled 制御に渡す
export function useGuestLogin() {
  const { push } = useRouter()
  const { mutate, isPending } = useLogin()

  const handleGuestLogin = () => {
    mutate(GUEST_LOGIN_CREDENTIALS, {
      onSuccess: (data) => {
        setAuthCookie()
        toast.success(data.message)
        push(ROUTES.HOME)
      },
      onError: (error) => {
        showApiErrorToast(error)
      },
    })
  }

  return { handleGuestLogin, isPending }
}
