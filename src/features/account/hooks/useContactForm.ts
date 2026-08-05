'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactFormSchema, type ContactFormInput } from '../schemas/contact'

// ContactForm の状態ロジックを集約。コンポーネントは presentational に保つ。
// 送信先 API は未実装のため、バリデーション成功時も実送信は行わず案内トーストのみ表示する。
// バックエンドの送信 API が実装され次第、ここを mutation 呼び出しに差し替える想定 (useRegisterForm と同方針)
export function useContactForm(defaultValues: ContactFormInput) {
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onSubmit',
    defaultValues,
  })

  const handleSubmit = form.handleSubmit(() => {
    toast.info('お問い合わせ機能は準備中です。今しばらくお待ちください。')
  })

  return { form, handleSubmit }
}
