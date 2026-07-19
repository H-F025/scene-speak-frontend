import type { AxiosError } from 'axios'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { showApiErrorToast } from './apiErrorToast'
import { HTTP_STATUS } from './constants'

interface ApiErrorPayload {
  message?: string
}

// 指定 status のレスポンスに対し、バックエンドの `message` を form.setError('root', ...) に設定する。
// 401 / 403 / 409 など「特定 status をフォーム上部に表示する」共通パターンを抽象化する。
// 該当した場合 true を返し、呼び出し側は early return できる
function handleRootMessageError<T extends FieldValues>(
  error: AxiosError,
  form: UseFormReturn<T>,
  statuses: readonly number[],
): boolean {
  const status = error.response?.status
  if (!status || !statuses.includes(status)) return false

  const payload = error.response?.data as ApiErrorPayload | undefined
  if (!payload?.message) return false

  form.setError('root', { message: payload.message })
  return true
}

// 422 (Unprocessable Entity) のレスポンスに対し、apply 関数経由で field 別に setError を実行する。
// errors オブジェクトの構造 (snake_case のフィールド名) や RHF への mapping は form ごとに異なるため、
// apply 関数を呼び出し側が注入する設計とする。
// 422 を受けた時点で「ハンドリング済み」とみなし true を返す (errors が空でも fall through させない)
function handleFieldValidationError<T extends FieldValues>(
  error: AxiosError,
  form: UseFormReturn<T>,
  apply: (payload: unknown, form: UseFormReturn<T>) => void,
): boolean {
  if (error.response?.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) return false
  apply(error.response?.data, form)
  return true
}

interface CreateFormErrorHandlerOptions<T extends FieldValues> {
  // 指定 status (401 / 403 / 409 等) → バックエンド message を setError('root') に流す
  rootStatuses?: readonly number[]
  // 422 のレスポンス payload を form 固有の field 別 setError に流す mapper。
  // クライアントバリデーション (zod) で実質ブロックできる form では指定不要
  fieldValidationMapper?: (payload: unknown, form: UseFormReturn<T>) => void
}

// form の mutation.onError を生成する factory。
// config に基づき「root エラー」「field エラー」をハンドリングし、
// 該当しない 5xx / ネットワーク等は自動で showApiErrorToast に fallback する。
// 各 form は config を渡すだけで onError を完成できる
export function createFormErrorHandler<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: CreateFormErrorHandlerOptions<T> = {},
): (error: AxiosError) => void {
  const { rootStatuses, fieldValidationMapper } = options

  return (error) => {
    if (rootStatuses && handleRootMessageError(error, form, rootStatuses)) {
      return
    }
    if (
      fieldValidationMapper &&
      handleFieldValidationError(error, form, fieldValidationMapper)
    ) {
      return
    }
    showApiErrorToast(error)
  }
}
