import type { ReactNode } from 'react'

import { Lightbulb } from '@/components/icons'

interface ExplanationCardProps {
  body: string
  // CompareBlock や inline AskAiCta を解説本文の下に流し込む
  children?: ReactNode
}

// 06_Feedback_* の「解説」カード (lightbulb + 見出し + 本文 + slot)
export function ExplanationCard({ body, children }: ExplanationCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-white p-4">
      <div className="flex items-center gap-1.5">
        <Lightbulb aria-hidden className="size-4 text-accent-orange" />
        <h3 className="text-sm font-semibold text-text-heading">解説</h3>
      </div>
      <p className="text-[14px] leading-relaxed text-text-muted">{body}</p>
      {children}
    </section>
  )
}
