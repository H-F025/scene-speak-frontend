// auth feature の TanStack Query キー集約。
// queryKey は読み取り側 (useQuery) と書き込み側 (setQueryData / invalidateQueries / removeQueries) で
// 厳密に一致させる必要があり、factory 関数で 1 箇所に閉じ込めることでタイポ事故を防ぐ。
export const AUTH_QUERY_KEYS = {
  user: () => ['auth', 'user'] as const,
} as const
