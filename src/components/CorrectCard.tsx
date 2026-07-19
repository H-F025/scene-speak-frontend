interface CorrectCardProps {
  label: string
  body: string
}

// english.ui.json `correctCard` (旧名 ImprovedCard)。
// feedbackIncorrect / reviewFbIncorrect で参照される「正しい回答」カード。
// AnswerCard との差別化のため warn 系カラーで強調 (bg `#FFF8F4` / border `#FFD1A8`)
export function CorrectCard({ label, body }: CorrectCardProps) {
  return (
    <section className="flex flex-col gap-1.5 rounded-2xl border border-[#FFD1A8] bg-[#FFF8F4] p-4">
      <p className="text-[11px] font-semibold text-warn">{label}</p>
      <p className="text-[15px] text-ink-900">{body}</p>
    </section>
  )
}
