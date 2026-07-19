import { z } from 'zod'
import { REGISTER_VALIDATION, REGISTER_VALIDATION_MESSAGE } from '../constants'

// email はチェーン式 .email() が zod v4 で deprecated のため .pipe(z.email()) で接続する。
// pipe は前段失敗時に後段を実行しないため、空入力時は「必須」、形式不正時は「形式」エラーのみ出る。
// passwordConfirmation の一致チェックは .refine() で行い、path 指定で
// passwordConfirmation フィールド配下にエラーを紐付ける (RHF FormMessage が拾える形)
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, REGISTER_VALIDATION_MESSAGE.NAME_REQUIRED)
      .max(
        REGISTER_VALIDATION.NAME_MAX_LENGTH,
        REGISTER_VALIDATION_MESSAGE.NAME_TOO_LONG,
      ),
    email: z
      .string()
      .min(1, REGISTER_VALIDATION_MESSAGE.EMAIL_REQUIRED)
      .max(REGISTER_VALIDATION.EMAIL_MAX_LENGTH)
      .pipe(z.email(REGISTER_VALIDATION_MESSAGE.EMAIL_INVALID)),
    password: z
      .string()
      .min(1, REGISTER_VALIDATION_MESSAGE.PASSWORD_REQUIRED)
      .min(
        REGISTER_VALIDATION.PASSWORD_MIN_LENGTH,
        REGISTER_VALIDATION_MESSAGE.PASSWORD_TOO_SHORT,
      )
      .max(REGISTER_VALIDATION.PASSWORD_MAX_LENGTH),
    passwordConfirmation: z
      .string()
      .min(1, REGISTER_VALIDATION_MESSAGE.PASSWORD_CONFIRMATION_REQUIRED),
    englishLevel: z
      .number()
      .int()
      .min(1, REGISTER_VALIDATION_MESSAGE.ENGLISH_LEVEL_REQUIRED),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: REGISTER_VALIDATION_MESSAGE.PASSWORD_MISMATCH,
    path: ['passwordConfirmation'],
  })

// React Hook Form のフォーム入力値型。API 層で snake_case の RegisterRequest に変換する
export type RegisterInput = z.infer<typeof registerSchema>
