import type { AxiosError } from 'axios'
import type { LoginErrorResponse, RegisterErrorResponse } from './user'

// 401 のレスポンス body 型を AxiosError ジェネリックに乗せ、呼び出し側で error.response?.data.message を型安全に参照できるようにする
export type LoginError = AxiosError<LoginErrorResponse>

// 409 (RegisterConflictResponse) / 422 (RegisterValidationErrorResponse) のいずれかを受ける。
// 呼び出し側で error.response?.status により分岐する想定
export type RegisterError = AxiosError<RegisterErrorResponse>
