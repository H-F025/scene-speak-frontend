// 06_ReviewFeedback_* 用 (復習フィードバック) コンポーネント群の barrel。
// 3 つの presentational primitive (ExplanationCard / CompareBlock / AskAiCta) と
// Correct/Incorrect レイアウトは ReviewFeedbackContent から相対 import 専用のため
// barrel に並べない (YAGNI)。
// AnswerCard / CorrectCard / ResultBadge は B 昇格済みで @/components から import する。
// ReviewFeedbackContent は page.tsx から消費される Container エントリのため公開する
export { ReviewFeedbackContent } from './ReviewFeedbackContent'
