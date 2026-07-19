// practice (通常問題) feature の public API。
// 外部から使うものが出てきた時点で都度 export を追加する (YAGNI)
export {
  ProblemListContent,
  QuestionCountBadge,
  QuestionProgress,
  ThemeProblemContent,
} from './components'
// (main)/layout.tsx の DynamicProblemListHeader / DynamicProblemQuestionHeader が
// page と同 queryKey で再呼び出しするため公開する (TanStack Query の dedup により実 fetch は 1 回)
export { useThemeQuestions } from './api/useThemeQuestions'
// DynamicProblemQuestionHeader が bottomSlot で QuestionProgress に渡す型を組み立てるため公開する
export type { QuestionProgress as QuestionProgressData } from './types/problem'
