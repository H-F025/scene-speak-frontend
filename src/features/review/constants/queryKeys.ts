// review (復習問題) feature の TanStack Query キー集約。
// 単一問題取得は (review_set_id, review_set_question_id) 別にキャッシュを分けるため factory 化
export const REVIEW_QUERY_KEYS = {
  all: ['review'] as const,
  reviewQuestion: (reviewSetId: number, reviewSetQuestionId: number) =>
    [
      ...REVIEW_QUERY_KEYS.all,
      'reviewQuestion',
      reviewSetId,
      reviewSetQuestionId,
    ] as const,
  reviewCompletion: (reviewSetId: number) =>
    [...REVIEW_QUERY_KEYS.all, 'reviewCompletion', reviewSetId] as const,
} as const
