'use client'

import { HTTP_STATUS } from '@/shared/lib/constants'
import { createFormErrorHandler } from '@/shared/lib/formErrorHandlers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useContact } from '../api'
import { contactFormSchema, type ContactFormInput } from '../schemas/contact'

// ContactForm の状態・副作用ロジックを集約。コンポーネントは presentational に保つ
export function useContactForm(defaultValues: ContactFormInput) {
  const { mutate, isPending } = useContact()

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onSubmit',
    defaultValues,
  })

  const handleSubmit = form.handleSubmit((values) => {
    // 再送信時に前回の root エラーを残さない
    form.clearErrors('root')

    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message)
        // 名前・メールは初期値として保持し、本文のみクリアする
        form.reset({ ...values, message: '' })
      },
      // 429 (レート制限) → root エラー / 5xx 等 → 共通トースト
      onError: createFormErrorHandler(form, {
        rootStatuses: [HTTP_STATUS.TOO_MANY_REQUESTS],
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
