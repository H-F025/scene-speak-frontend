// themes.length === 0 の時に表示する空状態 (Presentational)。
// 仕様: ThemeList の代わりに表示される (Notion 画面仕様書「表示できるテーマがありません。」準拠)
export function ThemeEmpty() {
  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-white p-5 text-center">
      <p className="text-base font-bold text-ink-900">
        表示できるテーマがありません
      </p>
      <p className="text-sm text-ink-500">別のレベルを選んでみてください。</p>
    </section>
  )
}
