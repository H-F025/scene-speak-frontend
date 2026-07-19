// account feature の TanStack Query キー集約。
// 英語レベルのマスタ一覧 (GET /english-levels) をキャッシュするための factory。
// マスタは変動しない参照系のため list 自体は引数を取らないが、
// 将来の拡張 (account 配下の他リソース追加) に備えて all を持つ。
// レベル更新 (PATCH) は user query (auth) を invalidate するため独自キーは持たない
export const ACCOUNT_QUERY_KEYS = {
  all: ['account'] as const,
  englishLevels: () => [...ACCOUNT_QUERY_KEYS.all, 'english-levels'] as const,
} as const
