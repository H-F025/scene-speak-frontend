import type { ReviewSetCategory } from '../types/reviewSet'

// 苦手カテゴリ最大表示件数。spec の「件数降順・最大 2 件」固定仕様
const MAX_CATEGORY_DISPLAY_COUNT = 2

// 各 index に対応する装飾色 (アイコン背景 / 件数バッジ)。
// バックエンドは色を返さないためフロント固定で 2 段階表現
// (将来 BE から `color` フィールドが来たら切り替え予定 — spec「考慮事項」参照)。
// アイコン背景は globals.css のトークン外 (#E8F8EE / #FFF4E8) のため任意値で記述する
const CATEGORY_DECORATION_BY_INDEX = [
  { iconWrapBg: 'bg-[#E8F8EE]', badgeTextColor: 'text-accent-green' },
  { iconWrapBg: 'bg-[#FFF4E8]', badgeTextColor: 'text-warn-soft' },
] as const

interface ReviewCategoryListProps {
  categories: ReviewSetCategory[]
}

// 苦手カテゴリ行（最大 2 件）。
// クリック非対応 (リンク化・hover 強調しない) のため <ul> + <li> + <div> 構造で表現する
// (spec 受け入れ条件「クリックしても反応しない」)
export function ReviewCategoryList({ categories }: ReviewCategoryListProps) {
  if (categories.length === 0) return null

  const visibleCategories = categories.slice(0, MAX_CATEGORY_DISPLAY_COUNT)

  return (
    <ul className="flex flex-col rounded-2xl bg-white">
      {visibleCategories.map((category, index) => {
        const decoration =
          CATEGORY_DECORATION_BY_INDEX[index] ?? CATEGORY_DECORATION_BY_INDEX[0]
        const isLast = index === visibleCategories.length - 1

        return (
          <li
            key={category.id}
            className={
              isLast
                ? 'flex items-center gap-3 px-3.5 py-3'
                : 'flex items-center gap-3 border-b border-page-50 px-3.5 py-3'
            }
          >
            <div
              aria-hidden
              className={`size-9 rounded-2xl ${decoration.iconWrapBg}`}
            />
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-xs font-semibold text-ink-500">
                {category.name}
              </p>
              <p className="text-[15px] font-bold text-ink-900">
                {category.description}
              </p>
            </div>
            <p className={`text-xs font-bold ${decoration.badgeTextColor}`}>
              {category.question_count}問
            </p>
          </li>
        )
      })}
    </ul>
  )
}
