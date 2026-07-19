import type { QuestionProgress as QuestionProgressData } from '../../types/problem'

interface QuestionProgressProps {
  progress: QuestionProgressData
  // 復習対象のカテゴリ名 (例: 時制・過去形)。
  // english.ui.json `progressLabel` 右側に表示する
  categoryName: string
}

// english.ui.json `progressWrap` (gap6 / padding [0,16,14,16]) に準拠 (review 版)。
// 「復習問題 N」+ カテゴリ名 + 進捗バー (warn fill)。
// total が 0 の場合は 0% にフォールバック (ゼロ除算回避)
export function QuestionProgress({
  progress,
  categoryName,
}: QuestionProgressProps) {
  const {
    current_question_number,
    total_question_count,
    completed_question_count,
  } = progress
  const percentage =
    total_question_count > 0
      ? Math.round((completed_question_count / total_question_count) * 100)
      : 0

  return (
    <div className="flex flex-col gap-1.5 px-4 pb-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-500">
          復習問題 {current_question_number}
        </span>
        <span className="text-xs text-success">{categoryName}</span>
      </div>
      <div
        role="progressbar"
        aria-label="解答進捗"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 rounded bg-border-soft"
      >
        <div
          aria-hidden
          className="h-full rounded bg-warn"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
