// BE が `questions: []` を返したケース (テーマに問題が未登録)。
// ProblemListContent 側で QuestionList → QuestionListEmpty に分岐される
export function QuestionListEmpty() {
  return (
    <p className="rounded-xl bg-white px-4 py-8 text-center text-sm text-ink-500">
      このテーマにはまだ問題がありません。
    </p>
  )
}
