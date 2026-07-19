'use client'

import { clearAuthArtifacts } from '@/shared/lib/authCookie'
import { ROUTES } from '@/shared/lib/constants'
import { useRef, useState } from 'react'
import { useLogoutMutation } from '../api'

// ログアウト処理を集約する hook。
// mutation 成功・失敗いずれの場合も marker / XSRF-TOKEN cookie を削除し、/login へフルリロード遷移する。
// フルリロードにより in-memory の TanStack Query キャッシュごと破棄されるため、
// removeQueries で active observer (layout / MyPage の useUser) を再 fetch させ、
// 破棄済みセッションに /me を投げて 401 → ErrorScreen がチラつく問題を回避する
// (= 別ユーザーへのキャッシュ漏洩防止も clear() 相当としてリロードで一括達成)。
// API 失敗時もクライアント側はログアウト扱いとする (BE 側 session が残っていても
// 次回 API 呼び出し時に 401 で再 redirect される設計のため安全)
export const useLogout = () => {
  const { mutate } = useLogoutMutation()
  // 「処理開始 〜 フルリロード完了」まで true を維持する。
  // mutation の isPending だけだと onSettled で navigation を開始しても、
  // ページが unload するまでの一瞬 isPending が false に戻りボタンが再活性化して連打できてしまう
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  // state 反映前の同期連打でも mutate を多重発火させないためのガード
  const hasStartedRef = useRef(false)

  const handleLogout = () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    setIsLoggingOut(true)

    mutate(undefined, {
      onSettled: () => {
        clearAuthArtifacts()
        window.location.href = ROUTES.LOGIN
      },
    })
  }

  // isLoggingOut は一度 true になったら戻さない (リロードで unmount されるため reset 不要)
  return { handleLogout, isPending: isLoggingOut }
}
