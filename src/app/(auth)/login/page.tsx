import type { Metadata } from 'next'

import { LoginForm, LoginHeader } from '@/features/auth'

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'Scene Speak へログインして英会話学習を続けよう。',
}

export default function LoginPage() {
  return (
    <>
      <LoginHeader />
      <LoginForm />
    </>
  )
}
