'use client'

import { Star } from '@/components/icons'

interface ProfileCardProps {
  name: string
  email: string
  levelLabel: string
}

// アバター画像は MVP 非対応のため、名前の先頭 2 文字をイニシャルとして円内に表示する
// (english.ui.json profileCard の「田中」表記に対応)。空文字でも slice は安全に空を返す
const getNameInitials = (name: string) => name.slice(0, 2)

// プロフィールカード: アバター(頭文字) + 名前 + メール + 英語レベル pill を縦に中央寄せ配置。
// english.ui.json profileCard 仕様 (白カード radius20 / vertical / gap14 / pad[24,16] / alignItems center)
export function ProfileCard({ name, email, levelLabel }: ProfileCardProps) {
  return (
    <section className="flex flex-col items-center gap-3.5 rounded-[20px] bg-white px-4 py-6 shadow-sm">
      <div
        aria-hidden
        className="flex size-20 items-center justify-center rounded-full bg-brand text-[26px] font-bold text-white"
      >
        {getNameInitials(name)}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[18px] font-bold text-ink-900">{name}</p>
        <p className="text-[13px] text-text-subtle">{email}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-[20px] bg-bg-subtle px-4 py-2 text-[13px] font-semibold text-brand">
        <Star aria-hidden className="size-3.5" />
        {levelLabel}レベル
      </span>
    </section>
  )
}
