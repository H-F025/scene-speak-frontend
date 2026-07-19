'use client'

import { useGreeting } from '../hooks'

interface HomeGreetingProps {
  userName: string
}

// ホーム画面上部のあいさつ行: 時刻に応じたあいさつ + ユーザー名 + アバター丸。
// アバター画像は MVP では固定 (青の円プレースホルダー)。
// english.ui.json greetingCard 仕様: greetText (18px heading + 22px brand-dark) + 44x44 avatar
export function HomeGreeting({ userName }: HomeGreetingProps) {
  const { greeting } = useGreeting()

  return (
    <section className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <p className="text-[18px] font-semibold text-ink-900">
          {greeting} <span aria-hidden>👋</span>
        </p>
        <p className="text-[22px] font-semibold text-brand-dark">
          {userName}さん
        </p>
      </div>
      <div aria-hidden className="size-11 rounded-full bg-[#93C5FD]" />
    </section>
  )
}
