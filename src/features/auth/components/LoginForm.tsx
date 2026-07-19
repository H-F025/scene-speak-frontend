'use client'

import { ActionButton } from '@/components'
import { Button, Form } from '@/components/ui'
import { ROUTES } from '@/shared/lib/constants'
import Link from 'next/link'
import { useLoginForm } from '../hooks'
import { PasswordField, TextField } from './fields'

export function LoginForm() {
  const { form, handleSubmit, isPending, rootError } = useLoginForm()

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
            autoComplete="current-password"
          />
          {/* パスワードリセット機能は別 spec。href 未定のため Button (link variant) で配置のみ */}
          <Button
            type="button"
            variant="link"
            className="h-auto self-end p-0 text-xs font-normal text-primary-alt hover:no-underline"
          >
            パスワードを忘れた方はこちら
          </Button>
        </div>

        <ActionButton type="submit" disabled={isPending}>
          ログイン
        </ActionButton>

        <div className="flex items-center justify-center gap-1 text-[13px]">
          <span className="text-ink-600-alt">アカウントをお持ちでない方は</span>
          <Link
            href={ROUTES.REGISTER}
            className="text-[13px] font-semibold text-primary-alt"
          >
            新規登録
          </Link>
        </div>
      </form>
    </Form>
  )
}
