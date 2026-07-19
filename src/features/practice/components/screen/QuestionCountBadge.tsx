interface QuestionCountBadgeProps {
  currentNumber: number
  totalCount: number
}

// Header の rightSlot に挿入する `4 / 10` 形式の問題数バッジ
export function QuestionCountBadge({
  currentNumber,
  totalCount,
}: QuestionCountBadgeProps) {
  return (
    <span
      aria-label={`${currentNumber} / ${totalCount} 問目`}
      className="rounded-xl bg-[#FFF4ED] px-2.5 py-1 text-sm font-bold text-accent-orange"
    >
      {currentNumber} / {totalCount}
    </span>
  )
}
