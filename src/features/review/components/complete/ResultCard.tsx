interface ResultCardProps {
  totalCount: number
  correctCount: number
}

// 07_ReviewComplete の origCard (今回の結果)。
// label + body の 2 行構造で、本文は「N問中 M問正解」の動的テキスト
export function ResultCard({ totalCount, correctCount }: ResultCardProps) {
  return (
    <section className="flex flex-col gap-2.5 rounded-2xl bg-white p-4">
      <p className="text-xs font-semibold text-ink-500">今回の結果</p>
      <p className="text-[17px] text-ink-700">
        {totalCount}問中 {correctCount}問正解
      </p>
    </section>
  )
}
