// 復習画面の導入セクション。見出し + 説明文の Presentational。
// 空状態 / 通常状態いずれでも上部に常時表示される (spec ユーザー操作フロー)
export function ReviewSetIntro() {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className="text-[18px] font-semibold text-ink-900">
        間違えたところをまとめて復習しましょう
      </h2>
      <p className="text-sm text-ink-500">
        会話練習でつまずいた表現や苦手な文法を、まとめて解き直せる問題集です。
      </p>
    </section>
  )
}
