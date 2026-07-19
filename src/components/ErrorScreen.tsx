'use client'

import { useRouter } from 'next/navigation'

import { AlertTriangle } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle, Button } from '@/components/ui'
import { hasAuthCookie } from '@/shared/lib/authCookie'
import { ROUTES } from '@/shared/lib/constants'
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '@/shared/lib/getApiErrorMessage'

type ErrorScreenProps = {
  // 表示文言はバックエンドの `message` を Single Source of Truth として使う
  error?: unknown
  // 押すとセグメントを再レンダリングするコールバック。`reset` 関数を渡す想定
  onRetry?: () => void
}

const BACK_LABEL = '前のページに戻る'
const RETRY_LABEL = '再試行'

// 全画面共通の汎用エラー UI。
// LoadingScreen / NotFoundScreen と同じく `fixed inset-0` で内部完結し、利用側は wrapper なしで呼び出せる。
// shadcn `Alert` (destructive) でエラーの存在を視覚的に強調し、その下にリトライ / 戻るのアクションを並べる。
// 戻るボタンのフォールバック先は document.cookie の auth marker から自動判定するため、(main) / root 共通の error.tsx で使える。
// 主な利用シーン:
// - App Router の `error.tsx` (Error Boundary fallback)
// - TanStack Query `useQuery` の fetch エラー (QueryProvider で throwOnError: true 設定済み)
//   → Error Boundary に昇格して error.tsx 経由で本コンポーネントに到達する
// 注意: `useMutation` のエラーは QueryProvider で throwOnError: false 設定のため Error Boundary に流れない。
//       フォーム側 (`setError('root', ...)` 等) で個別処理する設計
export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  const { back, replace } = useRouter()
  const message = getApiErrorMessage(error)
  const status = getApiErrorStatus(error)
  const isAuthenticated = hasAuthCookie()

  // 履歴があれば前のページへ。無い場合は認証状態に応じて home / login にフォールバック (NotFoundScreen と同方針)
  const handleBack = () => {
    if (window.history.length > 1) {
      back()
      return
    }
    replace(isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background px-6">
      <Alert
        variant="destructive"
        className="flex w-full max-w-80 flex-col items-center  text-center"
      >
        <AlertTriangle className="size-8" />
        {status !== null && <AlertTitle>{status} エラー</AlertTitle>}
        <AlertDescription className="whitespace-pre-line">
          {message}
        </AlertDescription>
      </Alert>
      <div className="flex w-full max-w-80 flex-col gap-2">
        {onRetry && (
          <Button type="button" onClick={onRetry}>
            {RETRY_LABEL}
          </Button>
        )}
        <Button type="button" variant="outline" onClick={handleBack}>
          {BACK_LABEL}
        </Button>
      </div>
    </div>
  )
}
