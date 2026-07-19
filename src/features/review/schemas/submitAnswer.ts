import { z } from 'zod'

// 復習解答送信フォームの SSoT。
// practice 側と同形だが、各 feature の SSoT を独立して持つ (Rule of Three / 3 箇所目で共通化)
export const submitAnswerSchema = z.object({
  question_choice_id: z
    .number({ message: '選択肢を選んでください。' })
    .int()
    .positive(),
})

export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>
