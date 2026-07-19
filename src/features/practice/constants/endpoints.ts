import { API_BASE_URL } from '@/shared/lib/constants'

// practice (通常問題) feature が呼び出すバックエンドエンドポイント (一次情報源)

// テーマ別問題一覧 (05b_ProblemList)。
// theme_level_id (= Theme × EnglishLevel の組合せ PK) を含む。Theme.id とは別シーケンスのため混同しないこと
export const themeQuestionsEndpoint = (themeLevelId: number): string =>
  `${API_BASE_URL}/themes/${themeLevelId}/questions`

// 通常問題取得 (05_ProblemScreen)。URL は learning-sessions 配下
export const themeQuestionEndpoint = (
  learningSessionId: number,
  questionId: number,
): string =>
  `${API_BASE_URL}/learning-sessions/${learningSessionId}/questions/${questionId}`

// 通常解答送信 (05_ProblemScreen)。問題取得 URL に /answer を付ける
export const themeAnswerEndpoint = (
  learningSessionId: number,
  questionId: number,
): string =>
  `${API_BASE_URL}/learning-sessions/${learningSessionId}/questions/${questionId}/answer`
