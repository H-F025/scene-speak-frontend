// history feature の TanStack Query キー集約。
// 年月別に別キャッシュを管理するため list(yearMonth) を factory 化する。
// yearMonth 未指定 (当月) は { yearMonth: null } として通常月と区別したキーになる。
// 将来の mutation 実装時に invalidateQueries({ queryKey: HISTORY_QUERY_KEYS.all }) で
// 全月キャッシュを一括無効化できるよう all を持つ
export const HISTORY_QUERY_KEYS = {
  all: ['histories'] as const,
  list: (yearMonth: string | undefined) =>
    [
      ...HISTORY_QUERY_KEYS.all,
      'list',
      { yearMonth: yearMonth ?? null },
    ] as const,
} as const
