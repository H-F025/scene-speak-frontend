'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

import {
  QUERY_DEFAULT_RETRY_COUNT,
  QUERY_GC_TIME_MS,
  QUERY_STALE_TIME_MS,
} from '@/shared/lib/constants'

interface QueryProviderProps {
  children: ReactNode
}

// SSR ではリクエストごとに新規生成、ブラウザでは singleton として再利用する
let browserQueryClient: QueryClient | undefined

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME_MS,
        gcTime: QUERY_GC_TIME_MS,
        refetchOnWindowFocus: false,
        retry: QUERY_DEFAULT_RETRY_COUNT,
        // エラー Boundary に委譲
        throwOnError: true,
      },
      mutations: {
        // mutation(更新、削除など) はフォーム側で個別処理する
        throwOnError: false,
      },
    },
  })
}

function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => getQueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
