interface AnswerCardProps {
  label: string
  body: string
}

// english.ui.json `answerCard` (旧名 OriginalSentenceCard)。
// feedbackCorrect / feedbackIncorrect / reviewFbCorrect / reviewFbIncorrect で参照。
// ユーザーが選択した解答を示す中立カラーのカード
export function AnswerCard({ label, body }: AnswerCardProps) {
  return (
    <section className="flex flex-col gap-1.5 rounded-2xl bg-white p-4">
      <p className="text-[11px] font-semibold text-ink-500">{label}</p>
      <p className="text-[15px] text-ink-900">{body}</p>
    </section>
  )
}
