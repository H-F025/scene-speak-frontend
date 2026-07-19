import { ROUTES } from '@/shared/lib/constants'

import type { NextRecommendationType } from '../types/reviewCompletion'

// 復習完了画面 (07_ReviewComplete) の文言テーブル。
// BE は reviewed_categories の配列と next_recommendation_type を返すだけで、
// 表示文言は FE 側で組み立てる (Notion「復習できたカテゴリ本文の表示ルール」「次のおすすめの表示ルール」)。

// pointCard 本文 (「復習できたカテゴリ」)。reviewed_categories.length と
// reviewed_category_count >= 3 の組み合わせで分岐する。
// length は API レスポンス上 0 / 1 / 2 のいずれか (最大 2 件) であることが BE 設計上保証されている
export const REVIEWED_CATEGORY_MESSAGES = {
  empty:
    '今回は復習済みのカテゴリがありません。次回は1問ずつ確認していきましょう。',
  single: (category: string) =>
    `${category}を中心に確認しました。間違えた表現をもう一度復習できました。`,
  double: (category1: string, category2: string) =>
    `${category1}、${category2}を中心に確認しました。間違えた表現をもう一度復習できました。`,
  multiple: (category1: string, category2: string) =>
    `${category1}、${category2}などを中心に確認しました。間違えた表現をもう一度復習できました。`,
} as const

// askAiCta「次のおすすめ」の type 別タイトル・本文・遷移先。
// review_skipped / review_remaining は苦手ノート一覧 (`/questions`)、
// review_completed はテーマ選択 (`/themes`) へ
export const NEXT_RECOMMENDATION_CONTENT: Record<
  NextRecommendationType,
  { title: string; body: string; href: string }
> = {
  review_skipped: {
    title: 'スキップした問題を確認しましょう',
    body: 'スキップした問題があります。次回の復習セットで優先して確認しましょう。',
    href: ROUTES.QUESTIONS,
  },
  review_remaining: {
    title: 'もう一度復習しましょう',
    body: 'まだ復習が必要な問題があります。時間を空けて、苦手問題集でもう一度確認しましょう。',
    href: ROUTES.QUESTIONS,
  },
  review_completed: {
    title: '新しい会話練習に進みましょう',
    body: '今回の復習で苦手問題を一通り確認できました。次は新しいテーマで表現を増やしましょう。',
    href: ROUTES.THEMES,
  },
} as const
