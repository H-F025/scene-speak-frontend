import { CircleAlert, CircleCheck } from '@/components/icons'
import { cn } from '@/shared/lib/utils'

interface ResultBadgeProps {
  variant: 'success' | 'warn'
  text: string
}

// english.ui.json `resultBadge` (旧名 CompletionBadge)。
// feedbackCorrect / feedbackIncorrect / reviewFbCorrect / reviewFbIncorrect / reviewComplete で参照。
// 結果を screen reader に即時通知するため role="status" + aria-live="polite" を付与
export function ResultBadge({ variant, text }: ResultBadgeProps) {
  const Icon = variant === 'success' ? CircleCheck : CircleAlert
  return (
    <output
      aria-live="polite"
      className={cn(
        'flex items-center gap-2 rounded-2xl px-4 py-3',
        variant === 'success'
          ? 'bg-[#E8F8EE] text-success'
          : 'bg-[#FFF4E8] text-warn-soft',
      )}
    >
      <Icon aria-hidden className="size-5" />
      <span className="text-sm font-semibold">{text}</span>
    </output>
  )
}
