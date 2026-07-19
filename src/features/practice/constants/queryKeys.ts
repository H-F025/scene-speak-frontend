// practice (通常問題) feature の TanStack Query キー集約。
// 一覧は theme_level_id、単一問題取得は (learning_session_id, question_id) 別にキャッシュを分けるため factory 化
export const PRACTICE_QUERY_KEYS = {
  all: ['practice'] as const,
  themeQuestions: (themeLevelId: number) =>
    [...PRACTICE_QUERY_KEYS.all, 'themeQuestions', themeLevelId] as const,
  themeQuestion: (learningSessionId: number, questionId: number) =>
    [
      ...PRACTICE_QUERY_KEYS.all,
      'themeQuestion',
      learningSessionId,
      questionId,
    ] as const,
} as const
