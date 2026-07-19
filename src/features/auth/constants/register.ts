// 新規登録フォームのバリデーション境界値。バックエンドの制約と同期させる
export const REGISTER_VALIDATION = {
  NAME_MAX_LENGTH: 20,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 255,
} as const

// 新規登録フォームのバリデーションメッセージ。
export const REGISTER_VALIDATION_MESSAGE = {
  NAME_REQUIRED: 'お名前を入力してください。',
  NAME_TOO_LONG: `お名前は${REGISTER_VALIDATION.NAME_MAX_LENGTH}文字以内で入力してください。`,
  EMAIL_REQUIRED: 'メールアドレスを入力してください。',
  EMAIL_INVALID: 'メールアドレスの形式で入力してください。',
  PASSWORD_REQUIRED: 'パスワードを入力してください。',
  PASSWORD_TOO_SHORT: `パスワードは${REGISTER_VALIDATION.PASSWORD_MIN_LENGTH}文字以上で入力してください。`,
  PASSWORD_CONFIRMATION_REQUIRED: 'パスワード（確認）を入力してください。',
  PASSWORD_MISMATCH: 'パスワードが一致しません。',
  ENGLISH_LEVEL_REQUIRED: '英語レベルを選択してください。',
} as const

// react-hook-form の defaultValues。englishLevel は未選択を 0 で表現し、
// zod スキーマの min(1) で「未選択」を検出する (undefined にすると RHF が uncontrolled 警告を出す)
export const REGISTER_FORM_DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  englishLevel: 0,
} as const
