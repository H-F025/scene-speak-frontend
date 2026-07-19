'use client'

import { ActionButton } from '@/components'
import { Form } from '@/components/ui'
import { ROUTES } from '@/shared/lib/constants'
import Link from 'next/link'
import { useRegisterForm } from '../hooks'
import { EnglishLevelField, PasswordField, TextField } from './fields'

export function RegisterForm() {
  const { form, handleSubmit, isPending, rootError } = useRegisterForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {rootError && (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-xl border-[1.5px] border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {rootError}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <TextField
            control={form.control}
            name="name"
            label="お名前"
            placeholder="山田 太郎"
            autoComplete="name"
          />
          <TextField
            control={form.control}
            name="email"
            label="メールアドレス"
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            inputMode="email"
          />
          <PasswordField
            control={form.control}
            name="password"
            label="パスワード"
            autoComplete="new-password"
          />
          <PasswordField
            control={form.control}
            name="passwordConfirmation"
            label="パスワード（確認）"
            autoComplete="new-password"
          />
          <EnglishLevelField
            control={form.control}
            name="englishLevel"
            label="英語レベル"
          />
        </div>

        <ActionButton
          type="submit"
          disabled={isPending}
          bgClassName="bg-accent-orange-500 hover:bg-accent-orange-500/90"
        >
          新規登録
        </ActionButton>

        <div className="flex items-center justify-center gap-1 text-[13px]">
          <span className="text-ink-600-alt">
            すでにアカウントをお持ちの方は
          </span>
          <Link
            href={ROUTES.LOGIN}
            className="text-[13px] font-semibold text-primary-alt"
          >
            ログイン
          </Link>
        </div>
      </form>
    </Form>
  )
}
