import { hasCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'

import { NotFoundScreen } from '@/components'
import { env } from '@/shared/lib/env'

// App Router の root not-found 規約ファイル。
// 任意のセグメントで `notFound()` が呼び出された場合や、未マッチ URL アクセス時に自動表示される。
// NotFoundScreen が `fixed inset-0` で内部完結するため、本ファイルでは認証判定と props 受け渡しのみ
export default async function NotFound() {
  // フロント側で発行する marker cookie の有無で認証状態を判定する (middleware と同基準)。
  // 履歴がない場合のフォールバック先 (home / login) を切り替えるために必要
  const isAuthenticated = await hasCookie(env.NEXT_PUBLIC_AUTH_COOKIE_NAME, {
    cookies,
  })

  return <NotFoundScreen isAuthenticated={isAuthenticated} />
}
