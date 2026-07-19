// weakness-workbook feature の TanStack Query キー集約。
// factory 関数で 1 箇所に閉じ込めることで、将来 mutation 連携時 (invalidateQueries 等) に
// タイポなく参照できるようにする
export const REVIEW_SET_QUERY_KEYS = {
  all: ['reviewSets'] as const,
  summary: () => [...REVIEW_SET_QUERY_KEYS.all, 'summary'] as const,
} as const
