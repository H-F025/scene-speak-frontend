import { z } from 'zod'

// お問い合わせフォームの SSoT (zod)。本フォーム 1 箇所でのみ使うためメッセージは定数化せず inline (YAGNI)。
// 送信先 API は未実装 (バックエンド未提供) のため、現時点ではクライアント側バリデーションのみが実質的な仕様となる
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください。')
    .max(50, 'お名前は50文字以内で入力してください。'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください。')
    .max(254, 'メールアドレスは254文字以内で入力してください。')
    .pipe(z.email('メールアドレスの形式が正しくありません。')),
  message: z
    .string()
    .min(1, 'お問い合わせ内容を入力してください。')
    .max(2000, 'お問い合わせ内容は2000文字以内で入力してください。'),
})

// React Hook Form のフォーム入力値型
export type ContactFormInput = z.infer<typeof contactFormSchema>
