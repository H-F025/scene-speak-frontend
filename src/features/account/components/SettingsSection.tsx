'use client'

import {
  ChevronRight,
  Info,
  LogOut,
  Shield,
  Signal,
  type LucideIcon,
} from '@/components/icons'
import { ROUTES, type Route } from '@/shared/lib/constants'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

interface SettingsSectionProps {
  onLogout: () => void
  isLoggingOut: boolean
}

// 設定メニュー項目。href のある項目は Link で遷移、無い項目 (プライバシー / ヘルプ) は遷移先未実装のため表示のみ。
// 英語レベル設定は spec-013 で実装したため /mypage/english-level へ遷移する
const MENU_ITEMS: ReadonlyArray<{
  label: string
  Icon: LucideIcon
  iconClassName: string
  href?: Route
}> = [
  {
    label: '英語レベル設定',
    Icon: Signal,
    iconClassName: 'text-brand',
    href: ROUTES.MYPAGE_ENGLISH_LEVEL,
  },
  { label: 'プライバシー', Icon: Shield, iconClassName: 'text-accent-green' },
  {
    label: 'ヘルプ・お問い合わせ',
    Icon: Info,
    iconClassName: 'text-text-subtle',
  },
]

const MENU_ROW_CLASS = 'flex h-14 items-center gap-3 px-4'

// 設定メニューカード + ログアウト行。
// href のある設定行は Link で遷移、無い行は非インタラクティブな表示要素。ログアウトのみ button で、
// useLogout の isPending (isLoggingOut) で disabled にして二重送信を防ぐ。
// 親 (MyPageContent) の flex gap に乗せるため fragment で 2 カードを返す
export function SettingsSection({
  onLogout,
  isLoggingOut,
}: SettingsSectionProps) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <ul>
          {MENU_ITEMS.map(({ label, Icon, iconClassName, href }, index) => {
            const rowContent = (
              <>
                <Icon aria-hidden className={cn('size-5', iconClassName)} />
                <span className="flex-1 text-[15px] text-ink-900">{label}</span>
                <ChevronRight
                  aria-hidden
                  className="size-4.5 text-icon-subtle"
                />
              </>
            )
            return (
              <li
                key={label}
                className={cn(index > 0 && 'border-t border-border-subtle')}
              >
                {href ? (
                  <Link href={href} className={MENU_ROW_CLASS}>
                    {rowContent}
                  </Link>
                ) : (
                  <div className={MENU_ROW_CLASS}>{rowContent}</div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
      <button
        type="button"
        onClick={onLogout}
        disabled={isLoggingOut}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-[28px] bg-[#FFF0F0] disabled:opacity-50"
      >
        <LogOut aria-hidden className="size-5 text-[#E53E3E]" />
        <span className="text-[16px] font-semibold text-[#E53E3E]">
          {isLoggingOut ? 'ログアウト中...' : 'ログアウト'}
        </span>
      </button>
    </>
  )
}
