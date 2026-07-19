import { MessageCircle } from '@/components/icons'

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-24 items-center justify-center rounded-full bg-brand-soft">
        <MessageCircle aria-hidden size={52} className="text-brand" />
      </div>
      <h1 className="text-[28px] font-semibold text-brand-dark">英会話Chat</h1>
      <p className="text-sm text-ink-600-alt">英会話をもっと楽しく</p>
    </div>
  )
}
