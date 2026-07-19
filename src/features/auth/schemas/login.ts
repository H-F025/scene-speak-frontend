import { z } from 'zod'
import { LOGIN_VALIDATION, LOGIN_VALIDATION_MESSAGE } from '../constants'

// email はチェーン式 .email() が zod v4 で deprecated のため .pipe(z.email()) で接続する。
// pipe は前段が失敗すると後段を実行しないため、空入力時は「必須」エラーのみ、
// 形式不正時は「形式」エラーのみが出る (RHF が先頭メッセージを採用する要件にも合致)。
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, LOGIN_VALIDATION_MESSAGE.EMAIL_REQUIRED)
    .max(LOGIN_VALIDATION.EMAIL_MAX_LENGTH)
    .pipe(z.email(LOGIN_VALIDATION_MESSAGE.EMAIL_INVALID)),
  password: z
    .string()
    .min(1, LOGIN_VALIDATION_MESSAGE.PASSWORD_REQUIRED)
    .min(
      LOGIN_VALIDATION.PASSWORD_MIN_LENGTH,
      LOGIN_VALIDATION_MESSAGE.PASSWORD_TOO_SHORT,
    )
    .max(LOGIN_VALIDATION.PASSWORD_MAX_LENGTH),
})

// React Hook Form のフォーム入力値型。サーバーへの LoginRequest と同形
export type LoginInput = z.infer<typeof loginSchema>
