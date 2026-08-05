// アプリ全体のルート (path) 定数。
// 直接リテラル (`'/home'` 等) を書かず、必ずこの定数経由で参照する (SSOT)。
// 新規ルート追加時はここに追記する
export const ROUTES = {
  TOP: '/',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  THEMES: '/themes',
  HISTORY: '/history',
  MYPAGE: '/mypage',
  MYPAGE_ENGLISH_LEVEL: '/mypage/english-level',
  MYPAGE_CONTACT: '/mypage/contact',
  QUESTIONS: '/questions',
  REVIEW_SETS: '/review-sets',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

// 動的セグメントを含むパスは文字列連結を分散させず、ここで一元化する。
// 引数名はディレクトリ名 ([themeId]/[questionId]) と対応するが、実体は theme_levels.id / questions.id の PK
export const themeQuestionsPath = (themeLevelId: number) =>
  `${ROUTES.THEMES}/${themeLevelId}/questions`

export const themeQuestionPath = (themeLevelId: number, questionId: number) =>
  `${ROUTES.THEMES}/${themeLevelId}/questions/${questionId}`

// 通常問題フィードバック画面。attemptId は前画面 (answer 送信) の question_attempt_id、
// themeLevelId は next_question_id === null 時の戻り先 (テーマ問題一覧) 構築に必要
export const feedbackPath = (
  questionId: number,
  attemptId: number,
  themeLevelId: number,
) =>
  `${ROUTES.QUESTIONS}/${questionId}/feedback?attemptId=${attemptId}&themeLevelId=${themeLevelId}`

// 復習問題画面。reviewSetId / reviewSetQuestionId は review_sets.id / review_set_questions.id の PK
export const reviewQuestionPath = (
  reviewSetId: number,
  reviewSetQuestionId: number,
) => `${ROUTES.REVIEW_SETS}/${reviewSetId}/questions/${reviewSetQuestionId}`

// 復習問題フィードバック画面。attemptId は前画面 (answer 送信) の question_attempt_id。
// reviewSetId / reviewSetQuestionId は path 由来で次問題遷移 / 戻り先構築に使う
export const reviewQuestionFeedbackPath = (
  reviewSetId: number,
  reviewSetQuestionId: number,
  attemptId: number,
) =>
  `${ROUTES.REVIEW_SETS}/${reviewSetId}/questions/${reviewSetQuestionId}/feedback?attemptId=${attemptId}`

// 復習完了画面 (07_ReviewComplete)。復習フィードバック最終問題後の遷移先
export const reviewCompletePath = (reviewSetId: number) =>
  `${ROUTES.REVIEW_SETS}/${reviewSetId}/complete`
