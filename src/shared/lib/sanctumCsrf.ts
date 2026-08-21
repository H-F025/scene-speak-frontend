import axios from 'axios'

import { SANCTUM_CSRF_COOKIE_PATH } from './constants'
import { getApiBaseUrl } from './env'

// Laravel Sanctum SPA 認証の CSRF Cookie 取得状態。
// 並行リクエストでも一度だけ /sanctum/csrf-cookie を叩くため module-level で共有する
let csrfInitialized = false
let csrfPromise: Promise<void> | null = null

export const fetchCsrfCookie = async (): Promise<void> => {
  if (csrfInitialized) return
  if (csrfPromise) return csrfPromise

  csrfPromise = (async () => {
    try {
      await axios.get(`${getApiBaseUrl()}${SANCTUM_CSRF_COOKIE_PATH}`, {
        withCredentials: true,
      })
      csrfInitialized = true
    } finally {
      // 成否に関わらず Promise を解放し、後続呼び出しが進めるようにする。
      // 失敗時は csrfInitialized が false のままなので、次回呼び出しで再取得される
      csrfPromise = null
    }
  })()

  return csrfPromise
}

// 419 (CSRF トークン期限切れ) リトライ時に状態をリセットし、再取得を強制する
export const resetCsrfState = (): void => {
  csrfInitialized = false
}
