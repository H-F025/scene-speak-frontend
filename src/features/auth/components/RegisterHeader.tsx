import { MessageCircle } from '@/components/icons'

export function RegisterHeader() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-24 items-center justify-center rounded-full bg-brand-soft">
        <MessageCircle aria-hidden size={52} className="text-brand" />
      </div>
      <h1 className="text-[28px] font-semibold text-brand-dark">新規登録</h1>
      <p className="text-[13px] text-ink-600-alt">
        アカウントを作成して学習を始めよう！
      </p>
    </div>
  )
}
