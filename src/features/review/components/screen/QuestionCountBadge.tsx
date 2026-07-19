interface QuestionCountBadgeProps {
  currentNumber: number
  totalCount: number
}

// 復習問題用 QuestionCountBadge。practice 側と同形だが Rule of Three (3 箇所目で共通化) で独立保持
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
