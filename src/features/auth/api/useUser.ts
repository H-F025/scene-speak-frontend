import { apiClient } from '@/shared/lib/apiClient'
import { QUERY_STALE_TIME_LONG_MS } from '@/shared/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { AUTH_ENDPOINTS, AUTH_QUERY_KEYS } from '../constants'
import type { UserResponse } from '../types/user'

const fetchUser = async (): Promise<UserResponse> => {
  const { data } = await apiClient.get<UserResponse>(AUTH_ENDPOINTS.ME)
  return data
}

// アプリ全体で共有するログインユーザー情報。
// AUTH_QUERY_KEYS.user() を queryKey として TanStack Query が dedup するため、
// どのコンポーネントから呼んでも単一の fetch / cache を共有する (Zustand 不要)。
// 401 は apiClient interceptor が捕捉して clearAuthArtifacts + フルリロード redirect するため
// この hook 側でエラーハンドリングは不要 (retry: false で即座に interceptor へ流す)
export const useUser = () =>
  useQuery({
    queryKey: AUTH_QUERY_KEYS.user(),
    queryFn: fetchUser,
    staleTime: QUERY_STALE_TIME_LONG_MS,
    retry: false,
  })
