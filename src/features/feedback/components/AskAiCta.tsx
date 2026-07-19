import Link from 'next/link'

import { ArrowRight } from '@/components/icons'

interface AskAiCtaProps {
  href: string
}

// english.ui.json `askAiInline` (explanationCard 内に配置される inline CTA)。
// 2026-06-05 リデザインで Correct/Incorrect いずれも ExplanationCard 内 inline に統一
export function AskAiCta({ href }: AskAiCtaProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-1 py-2 text-[13px] font-bold text-brand"
    >
      <span>もっと詳しくAIに聞く</span>
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  )
}
