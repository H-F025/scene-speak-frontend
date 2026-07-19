// 復習画面の「この問題集でできること」説明枠 (Presentational)。
// 説明文は UI 装飾コピーのためフロント固定 (BE message SSoT 原則は **エラー文言** 対象)
export function ReviewSetTip() {
  return (
    <section className="flex flex-col gap-1.5 rounded-2xl bg-brand-soft p-3.5">
      <p className="text-xs font-bold text-brand">この問題集でできること</p>
      <p className="text-[13px] text-ink-700">
        間違えた表現だけを集めて、短時間で繰り返し練習できます。
      </p>
    </section>
  )
}
