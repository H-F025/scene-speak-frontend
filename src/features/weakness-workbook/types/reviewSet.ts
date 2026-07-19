import type { AxiosError } from 'axios'

// 復習優先度の discriminator。UI 側でプログレスバーの幅 / 表示制御 (`non` 時カード非表示) に使う
export type ReviewSetPriority = 'non' | 'low' | 'medium' | 'high'

// GET /api/v1/review-sets の苦手カテゴリ要素 (件数降順・最大 2 件)
export interface ReviewSetCategory {
  id: number
  name: string
  description: string
  question_count: number
}

// GET /api/v1/review-sets 200 レスポンス。
// priority_label / estimated_minutes は BE フォーマット済み文字列のためそのまま表示する
// (CLAUDE.md「バックエンド message を SSoT」原則を表示文言にも適用)
export interface ReviewSetResponse {
  question_count: number
  priority: ReviewSetPriority
  priority_label: string | null
  estimated_seconds: number
  estimated_minutes: string
  categories: ReviewSetCategory[]
}

// POST /api/v1/review-sets 201 レスポンス。
// 復習問題画面 (`05_ProblemScreen` 別 spec) への遷移時にパスへ埋め込む
export interface StartReviewSetResponse {
  review_set_id: number
  first_review_set_question_id: number
}

// 復習セット API の共通エラーレスポンス (401 / 409 等)
export interface ReviewSetErrorResponse {
  message: string
}

// useStartReviewSet が throw する AxiosError 型。
// 呼び出し側で error.response?.status === HTTP_STATUS.CONFLICT で 409 (復習対象なし) を分岐する想定
export type StartReviewSetError = AxiosError<ReviewSetErrorResponse>
