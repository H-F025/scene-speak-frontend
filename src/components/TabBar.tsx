'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Clock3,
  House,
  LayoutGrid,
  User,
  type LucideIcon,
} from '@/components/icons'
import { LABELS, ROUTES } from '@/shared/lib/constants'
import { cn } from '@/shared/lib/utils'

// (main) ルートグループ配下の下部タブナビゲーション項目。
// `additionalActivePaths` には「この tab を active 扱いする派生 path」を列挙する
// (例: home tab は /questions・/review-sets/... など、ホーム導線から派生する画面も active)
const NAV_ITEMS: ReadonlyArray<{
  href: string
  label: string
  Icon: LucideIcon
  additionalActivePaths?: ReadonlyArray<string>
}> = [
  {
    href: ROUTES.HOME,
    label: LABELS.HOME,
    Icon: House,
    additionalActivePaths: [ROUTES.QUESTIONS, ROUTES.REVIEW_SETS],
  },
  { href: ROUTES.THEMES, label: LABELS.THEMES, Icon: LayoutGrid },
  { href: ROUTES.HISTORY, label: LABELS.HISTORY, Icon: Clock3 },
  { href: ROUTES.MYPAGE, label: LABELS.MYPAGE, Icon: User },
]

const isPathMatching = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)

// tab item が active かどうかを判定する。
// 自身の href にマッチ または `additionalActivePaths` のいずれかにマッチした場合に active 扱い
const isNavItemActive = (
  pathname: string,
  href: string,
  additionalActivePaths?: ReadonlyArray<string>,
) =>
  isPathMatching(pathname, href) ||
  (additionalActivePaths?.some((path) => isPathMatching(pathname, path)) ??
    false)

export function TabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="メインナビゲーション"
      className="sticky bottom-0 z-50 bg-white px-5.25 pt-3 pb-5.25"
    >
      <ul className="flex h-15.5 rounded-[36px] border border-border-subtle p-1">
        {NAV_ITEMS.map(({ href, label, Icon, additionalActivePaths }) => {
          const isActive = isNavItemActive(
            pathname,
            href,
            additionalActivePaths,
          )
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center gap-1 rounded-4xl',
                  isActive ? 'bg-brand text-white' : 'text-text-subtle',
                )}
              >
                <Icon aria-hidden size={18} />
                <span className="text-[10px] font-semibold">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
