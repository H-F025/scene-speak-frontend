interface ProgressCardProps {
  completedCount: number
  totalCount: number
  progressPercentage: number
}

// 進捗カード。3 値とも BE 計算済み (theme_learning_progresses) のため FE は表示するだけ。
// プログレスバー幅は inline style で動的指定 (Tailwind の動的クラスは tree-shake で消えるため)
export function ProgressCard({
  completedCount,
  totalCount,
  progressPercentage,
}: ProgressCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_8px_#3B82F618]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-heading">
          🏆 {completedCount} / {totalCount} 問完了
        </h2>
        <span className="text-sm font-bold text-accent-orange">
          {progressPercentage}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="進捗"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 rounded bg-border-subtle"
      >
        <div
          aria-hidden
          className="h-full rounded bg-accent-orange"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </section>
  )
}
