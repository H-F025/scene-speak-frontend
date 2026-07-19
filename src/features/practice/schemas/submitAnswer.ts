import { z } from 'zod'

// 解答送信フォームの SSoT。
// 選択肢未選択時はフォーム値が undefined となり、z.number() が「選択肢を選んでください。」を返す。
// BE 側の 422「指定された選択肢はこの問題に含まれていません。」は zod でブロックできない領域だが、
// ChoiceList が表示する選択肢の id を直接渡す前提のため通常ユーザー操作では発生しない
export const submitAnswerSchema = z.object({
  question_choice_id: z
    .number({ message: '選択肢を選んでください。' })
    .int()
    .positive(),
})

export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>
