import { toast } from 'sonner'

import { getApiErrorMessage } from './getApiErrorMessage'

// TanStack Query / Mutation の onError ハンドラとして使う統一エラートースト表示ヘルパー。
// 422 (フォームバリデーション) は呼び出し側で setError(field, ...) で処理するため、
// このヘルパーは「フォーム単位で個別表示しないエラー」(500 / 503 / 429 / ネットワーク等) を担当する想定
export const showApiErrorToast = (error: unknown): void => {
  toast.error(getApiErrorMessage(error))
}
