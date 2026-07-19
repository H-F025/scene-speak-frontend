// 05_ProblemScreen 用 (practice / 通常問題) コンポーネント群の barrel。
// ChoiceList / SceneCard は PracticeProblemScreen から相対 import 専用のため barrel に並べない (YAGNI)。
// BottomBar は src/components/BottomBar に昇格済み (Rule of Three 達成: practice / review / feedback)。
// QuestionCountBadge / QuestionProgress は (main)/layout.tsx の DynamicProblemQuestionHeader が
// rightSlot / bottomSlot で消費するため barrel + public API に公開する
export { PracticeProblemScreen } from './PracticeProblemScreen'
export { QuestionCountBadge } from './QuestionCountBadge'
export { QuestionProgress } from './QuestionProgress'
export { ThemeProblemContent } from './ThemeProblemContent'
