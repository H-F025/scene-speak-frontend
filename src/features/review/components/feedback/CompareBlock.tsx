import { ArrowRight } from '@/components/icons'

interface CompareBlockProps {
  wrong: string
  correct: string
}

// 06_ReviewFeedback_Incorrect の ExplanationCard 内に置く誤→正の対比ブロック。
// 誤答に取り消し線、正答に warn 強調で視線誘導
export function CompareBlock({ wrong, correct }: CompareBlockProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-bg-app p-3">
      <p className="text-[13px] text-text-subtle line-through">{wrong}</p>
      <div className="flex items-center gap-2">
        <ArrowRight aria-hidden className="size-3.5 text-accent-orange-soft" />
        <p className="text-[13px] font-semibold text-accent-orange">
          {correct}
        </p>
      </div>
    </div>
  )
}
