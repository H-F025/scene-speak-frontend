import { Button } from '@/components/ui'
import { cn } from '@/shared/lib/utils'

interface ChoiceCardProps {
  label: string
  content: string
  selected: boolean
  onClick: () => void
}

// english.ui.json `choiceCard` (problemScreen / reviewProblem の A-D 選択肢)。
// 選択中は border / bg / ラベル円を primary 系に切り替える
export function ChoiceCard({
  label,
  content,
  selected,
  onClick,
}: ChoiceCardProps) {
  return (
    <Button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'h-auto justify-start gap-3 rounded-xl border-[1.5px] px-4 py-3.5 whitespace-normal',
        selected
          ? 'border-primary-alt bg-page-50 hover:bg-page-50'
          : 'border-border-soft bg-white hover:bg-white',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold',
          selected
            ? 'bg-primary-alt text-white'
            : 'bg-page-50 text-primary-alt',
        )}
      >
        {label}
      </span>
      <span className="text-[15px] text-ink-900">{content}</span>
    </Button>
  )
}
