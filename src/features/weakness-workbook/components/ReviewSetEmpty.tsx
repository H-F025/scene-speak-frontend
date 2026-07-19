// 復習対象が 0 件 (question_count === 0) のときに表示する空状態 (Presentational)。
// 仕様: ReviewSetIntro の下、Card / CategoryList / Tip / StartButton の代わりに表示される
export function ReviewSetEmpty() {
  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-white p-5 text-center">
      <p className="text-base font-bold text-ink-900">
        まだ苦手問題はありません
      </p>
      <p className="text-sm text-ink-500">
        会話練習を続けていくと、間違えた表現がここに集まります。
      </p>
    </section>
  )
}
