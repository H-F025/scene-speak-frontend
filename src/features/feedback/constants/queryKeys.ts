// feedback (通常問題フィードバック) feature の TanStack Query キー集約。
// question_attempt_id 単位で結果を取得・キャッシュするため factory 化
export const FEEDBACK_QUERY_KEYS = {
  all: ['feedback'] as const,
  questionAttempt: (attemptId: number) =>
    [...FEEDBACK_QUERY_KEYS.all, 'questionAttempt', attemptId] as const,
} as const
