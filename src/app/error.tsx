'use client'

import { ErrorScreen } from '@/components'

// App Router の root error 規約ファイル。
// 任意のセグメントの Error Boundary 配下で予期せぬエラーが throw された場合、自動表示される。
// ErrorScreen が `fixed inset-0` で内部完結するため、本ファイルでは props 受け渡しのみ
type GlobalErrorProps = {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return <ErrorScreen error={error} onRetry={reset} />
}
