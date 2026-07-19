import { ChevronRight } from '@/components/icons'

import { NEXT_RECOMMENDATION_CONTENT } from '../../constants'
import type { NextRecommendationType } from '../../types/reviewCompletion'

interface ReviewNextRecommendationCtaProps {
  type: NextRecommendationType
  onClick: () => void
}

// 07_ReviewComplete の askAiCta (次のおすすめ)。
// AI バッジ + 動的タイトル + chevron-right + 動的本文。遷移先は呼び出し側 (Container) が解決する
export function ReviewNextRecommendationCta({
  type,
  onClick,
}: ReviewNextRecommendationCtaProps) {
  const { title, body } = NEXT_RECOMMENDATION_CONTENT[type]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className="flex w-full flex-col gap-2 rounded-2xl border-[1.5px] border-[#D8E8F8] bg-white p-4 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#EBF4FF] text-xs font-bold text-primary">
          AI
        </span>
        <span className="flex-1 text-[15px] font-bold text-ink-900">
          {title}
        </span>
        <ChevronRight aria-hidden className="size-5 text-[#9BB0C5]" />
      </div>
      <p className="text-[13px] text-[#6B8CAE]">{body}</p>
    </button>
  )
}
