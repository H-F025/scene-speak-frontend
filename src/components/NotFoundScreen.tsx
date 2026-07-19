'use client'

import { Button } from '@/components/ui'
import { HTTP_STATUS, ROUTES } from '@/shared/lib/constants'
import { useRouter } from 'next/navigation'

type NotFoundScreenProps = {
  isAuthenticated?: boolean
  title?: string
  description?: string
  backLabel?: string
}

const DEFAULT_TITLE = 'ページが見つかりませんでした'
const DEFAULT_DESCRIPTION =
  'お探しのページは削除されたか、URL が変更された可能性があります。'
const DEFAULT_BACK_LABEL = '前のページに戻る'

// 全画面共通の汎用 404 UI。
// App Router の `not-found.tsx` から呼び出され、未マッチ URL や `notFound()` 呼び出し時に表示される
export function NotFoundScreen({
  isAuthenticated = false,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  backLabel = DEFAULT_BACK_LABEL,
}: NotFoundScreenProps) {
  const { back, replace } = useRouter()

  // 履歴があれば前のページへ。無い場合 (ブックマーク・外部リンク直アクセス等) は
  // 認証状態に応じて home / login にフォールバック
  const handleBack = () => {
    if (window.history.length > 1) {
      back()
      return
    }
    replace(isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN)
  }

  // LoadingScreen と同じく `fixed inset-0` で全画面を覆い、利用側は wrapper なしで呼び出せる設計
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-6xl font-semibold text-primary-alt" aria-hidden="true">
        {HTTP_STATUS.NOT_FOUND}
      </p>
      <h1 className="text-xl font-semibold text-ink-700-alt">{title}</h1>
      <p className="text-sm text-ink-600-alt">{description}</p>
      <Button type="button" onClick={handleBack}>
        {backLabel}
      </Button>
    </div>
  )
}
