// home feature が使う TanStack Query の queryKey 定義。
// 定数化することで、将来の mutation 実装時に他 feature から
// queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEYS.ALL }) でタイポなく参照できるようにする
export const HOME_QUERY_KEYS = {
  ALL: ['home'] as const,
} as const
