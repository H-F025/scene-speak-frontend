import { z } from 'zod'

// 英語レベル選択フォームの SSoT (CLAUDE.md「zod を SSoT とする」原則)。
// english_levels.id (number) を保持する。初期値に現在レベルの id を必ず入れるため、
// 通常操作では未選択 (min 未満) は発生しないが、保険として min(1) を課す。
// メッセージは本フォーム 1 箇所でのみ使うため定数化せず inline (YAGNI)
export const englishLevelFormSchema = z.object({
  id: z.number().int().min(1, '英語レベルを選択してください。'),
})

// React Hook Form のフォーム入力値型
export type EnglishLevelFormInput = z.infer<typeof englishLevelFormSchema>
