// ログインフォームのバリデーション境界値。バックエンド の制約と同期させる
export const LOGIN_VALIDATION = {
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 255,
} as const

// ログインフォームのバリデーションメッセージ。
export const LOGIN_VALIDATION_MESSAGE = {
  EMAIL_REQUIRED: 'メールアドレスを入力してください。',
  EMAIL_INVALID: 'メールアドレスの形式で入力してください。',
  PASSWORD_REQUIRED: 'パスワードを入力してください。',
  PASSWORD_TOO_SHORT: `パスワードは${LOGIN_VALIDATION.PASSWORD_MIN_LENGTH}文字以上で入力してください。`,
} as const

// react-hook-form の defaultValues。型は LoginInput と一致する必要があるため
// schemas/login.ts 側で型整合を担保する (満たさない場合は useForm<LoginInput> でコンパイルエラー)
export const LOGIN_FORM_DEFAULT_VALUES = {
  email: '',
  password: '',
} as const
