import { Lightbulb } from '@/components/icons'

import { REVIEWED_CATEGORY_MESSAGES } from '../../constants'

interface PointCardProps {
  categories: string[]
  categoryCount: number
}

// 動的本文を `categories` と `categoryCount` から組み立てる。
// BE は配列を最大 2 件で確定して返し、3 件以上かどうかは categoryCount >= 3 で判定する
function buildBody(categories: string[], categoryCount: number): string {
  if (categoryCount >= 3 && categories.length >= 2) {
    return REVIEWED_CATEGORY_MESSAGES.multiple(categories[0], categories[1])
  }
  if (categories.length === 2) {
    return REVIEWED_CATEGORY_MESSAGES.double(categories[0], categories[1])
  }
  if (categories.length === 1) {
    return REVIEWED_CATEGORY_MESSAGES.single(categories[0])
  }
  return REVIEWED_CATEGORY_MESSAGES.empty
}

// 07_ReviewComplete の「復習できたカテゴリ」カード。
// 件数 (0/1/2/3+) に応じて本文を出し分ける (文言は constants/reviewCompletion.ts に集約)
export function PointCard({ categories, categoryCount }: PointCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-white p-4">
      <header className="flex items-center gap-2">
        <Lightbulb aria-hidden className="size-[18px] text-warn" />
        <h2 className="text-[15px] font-semibold text-ink-900">
          復習できたカテゴリ
        </h2>
      </header>
      <p className="text-sm text-ink-700">
        {buildBody(categories, categoryCount)}
      </p>
    </section>
  )
}
