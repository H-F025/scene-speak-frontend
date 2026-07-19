import Link from 'next/link'

import { MessageCircle } from '@/components/icons'
import { GuestLoginButton } from '@/features/auth'
import { ROUTES } from '@/shared/lib/constants'

const NAV_LINK_CLASS =
  'inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors sm:px-4'

// 未ログイン TOP ページ専用ヘッダー。左に (auth) 画面と共通のロゴ (吹き出しアイコン + サービス名)、
// 右にログイン / 新規登録 / ゲストログイン導線をまとめて配置する
export function TopHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between sm:p-6">
      <Link href={ROUTES.TOP} className="flex items-center gap-2 self-start">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft"
        >
          <MessageCircle className="size-5 text-brand" />
        </span>
        <span className="text-lg font-semibold whitespace-nowrap text-text-heading">
          Scene Speak
        </span>
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <Link
          href={ROUTES.LOGIN}
          className={`${NAV_LINK_CLASS} text-text-heading hover:bg-bg-subtle`}
        >
          ログイン
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className={`${NAV_LINK_CLASS} bg-brand text-white hover:bg-brand/90`}
        >
          新規登録
        </Link>
        <GuestLoginButton variant="compact" />
      </div>
    </header>
  )
}
