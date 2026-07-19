import type { Metadata } from 'next'

import { RegisterForm, RegisterHeader } from '@/features/auth'

export const metadata: Metadata = {
  title: '新規登録',
  description: 'Scene Speak の新規アカウントを作成して英会話学習を始めよう。',
}

export default function RegisterPage() {
  return (
    <>
      <RegisterHeader />
      <RegisterForm />
    </>
  )
}
