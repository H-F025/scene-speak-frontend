import type { EnglishLevel } from '../schemas/englishLevel'

// themes feature の TanStack Query キー集約。
// レベル別キャッシュを別管理するため list(level) を factory 化。
// 将来の mutation 実装時に invalidateQueries({ queryKey: THEME_QUERY_KEYS.all }) で
// レベル違いキャッシュも一括無効化できるよう all を持つ
export const THEME_QUERY_KEYS = {
  all: ['themes'] as const,
  list: (level: EnglishLevel | undefined) =>
    [...THEME_QUERY_KEYS.all, 'list', { level: level ?? null }] as const,
} as const
