'use client'

import type { ReactNode } from 'react'

import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { Header } from '@/components'
import { HistoryHeader } from '@/features/history'
import {
  QuestionCountBadge as PracticeQuestionCountBadge,
  QuestionProgress as PracticeQuestionProgress,
  type QuestionProgressData,
  useThemeQuestions,
} from '@/features/practice'
import {
  QuestionCountBadge as ReviewQuestionCountBadge,
  QuestionProgress as ReviewQuestionProgress,
  useReviewQuestion,
} from '@/features/review'
import { getThemeAppearance } from '@/features/themes'
import { ROUTES, themeQuestionsPath } from '@/shared/lib/constants'

// (main) 配下の Header 解決を 1 ファイルに集約する。
// 複数 feature (practice / review / themes / history) の hook・データを束ねるため、
// 依存方向 (app → features) 上ここ (app 層) でしか組めない。Header.tsx (components) は presentational に保つ。

const PROBLEM_LIST_PATTERN = /^\/themes\/(\d+)\/questions$/
const PROBLEM_QUESTION_PATTERN = /^\/themes\/(\d+)\/questions\/(\d+)$/
const REVIEW_PROBLEM_PATTERN = /^\/review-sets\/(\d+)\/questions\/(\d+)$/
const FEEDBACK_PATTERN = /^\/questions\/(\d+)\/feedback$/
const REVIEW_FEEDBACK_PATTERN =
  /^\/review-sets\/(\d+)\/questions\/(\d+)\/feedback$/
const REVIEW_COMPLETE_PATTERN = /^\/review-sets\/(\d+)\/complete$/
const HISTORY_PATTERN = /^\/history$/

// フィードバック画面の戻り先。URL クエリ themeLevelId からテーマ問題一覧へ、欠落 / 不正ならテーマトップへ
const feedbackBackTo = (searchParams: ReadonlyURLSearchParams): string => {
  const themeLevelId = Number(searchParams.get('themeLevelId'))
  return Number.isInteger(themeLevelId) && themeLevelId > 0
    ? themeQuestionsPath(themeLevelId)
    : ROUTES.THEMES
}

// テーマ別問題一覧画面の動的 Header。
// useThemeQuestions は ProblemListContent (page 側) と同 queryKey で呼ばれるため
// TanStack Query の in-flight dedup により実 fetch は 1 回のみ。
// appearance のキーには URL の theme_level_id ではなく、レスポンスに含まれる theme.id (Theme PK) を使う。
// THEME_APPEARANCE_BY_ID は Theme PK でマッピングされており、theme_level_id とは別シーケンスのため
function DynamicProblemListHeader({ themeLevelId }: { themeLevelId: number }) {
  const { push } = useRouter()
  const { data } = useThemeQuestions(themeLevelId)
  const appearance = getThemeAppearance(data.theme.id)
  return (
    <Header
      title={`${appearance.emoji} ${data.theme.title}`}
      onBack={() => push(ROUTES.THEMES)}
      withBottomBorder
      // 2026-06-05 リデザイン: problemList nav の navRight は orange 系のレベル pill (38×22 / #FFF4ED bg / $accent-orange)。
      // themes 側 ThemeBadge ($accent-green 系) とは色設計が異なるため inline で別形状を描く
      rightSlot={
        <span className="inline-flex h-5.5 min-w-9.5 items-center justify-center rounded-lg bg-[#FFF4ED] px-2 text-[11px] font-semibold text-accent-orange">
          {data.theme.english_level_label}
        </span>
      }
    />
  )
}

// 通常問題回答画面 (/themes/[themeId]/questions/[questionId]) の動的 Header。
// タイトルはテーマ情報 (emoji + theme.title) なので一覧と同じ useThemeQuestions の cache を流用する。
// QuestionCountBadge / QuestionProgress の current/total/completed は learning_session_id 非依存で
// 算出するため、useThemeQuestion (lsid 必須) ではなく一覧データ (questions 配列 + theme summary) から導出する。
// 解答送信後の completed_question_count 更新は useSubmitAnswer の invalidate でキャッシュをリフレッシュする想定。
// 戻るボタンは問題一覧画面へ。finish('abandoned') は ProblemScreen の unmount cleanup で発火される設計のため
// Header 側は単純な router.push のみで責務を持たない
function DynamicProblemQuestionHeader({
  themeLevelId,
  questionId,
}: {
  themeLevelId: number
  questionId: number
}) {
  const { push } = useRouter()
  const { data } = useThemeQuestions(themeLevelId)
  const appearance = getThemeAppearance(data.theme.id)
  const currentQuestion = data.questions.find((q) => q.id === questionId)
  const progress: QuestionProgressData = {
    current_question_number: currentQuestion?.number ?? 0,
    total_question_count: data.theme.total_question_count,
    completed_question_count: data.theme.completed_question_count,
    remaining_question_count:
      data.theme.total_question_count - data.theme.completed_question_count,
  }
  return (
    <Header
      title={`${appearance.emoji} ${data.theme.title}`}
      onBack={() => push(`${ROUTES.THEMES}/${themeLevelId}/questions`)}
      rightSlot={
        <PracticeQuestionCountBadge
          currentNumber={currentQuestion?.number ?? 0}
          totalCount={data.questions.length}
        />
      }
      bottomSlot={<PracticeQuestionProgress progress={progress} />}
    />
  )
}

// 復習問題回答画面 (/review-sets/[reviewSetId]/questions/[reviewSetQuestionId]) の動的 Header。
// タイトルは「今週の復習セット」固定 (BE 由来の表示文言ではなく画面ナビゲーション label のため hardcode)。
// QuestionCountBadge は useReviewQuestion の progress (current_question_number / total_question_count) を使う
// (ProblemScreen 側でも同 queryKey を消費するため dedup で実 fetch 1 回)。
// 戻るボタンの遷移先は task #5/#6 で確定するまでの暫定として ROUTES.HOME を採用
function DynamicReviewProblemHeader({
  reviewSetId,
  reviewSetQuestionId,
}: {
  reviewSetId: number
  reviewSetQuestionId: number
}) {
  const { push } = useRouter()
  const { data } = useReviewQuestion(reviewSetId, reviewSetQuestionId)
  return (
    <Header
      title="今週の復習セット"
      onBack={() => push(ROUTES.HOME)}
      rightSlot={
        <ReviewQuestionCountBadge
          currentNumber={data.progress.current_question_number}
          totalCount={data.progress.total_question_count}
        />
      }
      bottomSlot={
        <ReviewQuestionProgress
          progress={data.progress}
          categoryName={data.category_name}
        />
      }
    />
  )
}

// pathname → Header の単一レジストリ。上から順に最初に pattern が一致したエントリを採用する
// (pattern は全て anchored で相互排他のため順序は機能上無関係。可読性のため 静的 → 動的 の順)。
// render は match と { push, searchParams } を受け、共通 <Header> または専用ヘッダーを返す。
// 静的エントリの戻り遷移のみここで担い、session の finish('abandoned') 等は各画面の unmount cleanup が担当する。
type HeaderContext = {
  push: (href: string) => void
  searchParams: ReadonlyURLSearchParams
}

type HeaderEntry = {
  pattern: RegExp
  render: (match: RegExpMatchArray, ctx: HeaderContext) => ReactNode
}

const HEADERS: HeaderEntry[] = [
  { pattern: /^\/home$/, render: () => <Header title="🏠 ホーム" /> },
  {
    pattern: /^\/questions$/,
    render: (_m, { push }) => (
      <Header title="💪 苦手問題集" onBack={() => push(ROUTES.HOME)} />
    ),
  },
  {
    pattern: /^\/themes$/,
    render: () => <Header title="💬 会話テーマを選ぶ" />,
  },
  {
    pattern: /^\/mypage$/,
    render: () => <Header title="👤 マイページ" />,
  },
  {
    pattern: /^\/mypage\/english-level$/,
    render: (_m, { push }) => (
      <Header title="🎯 英語レベル設定" onBack={() => push(ROUTES.MYPAGE)} />
    ),
  },
  {
    pattern: /^\/mypage\/contact$/,
    render: (_m, { push }) => (
      <Header title="✉️ お問い合わせ" onBack={() => push(ROUTES.MYPAGE)} />
    ),
  },
  {
    pattern: FEEDBACK_PATTERN,
    render: (_m, { push, searchParams }) => (
      <Header
        title="✍️ 添削フィードバック"
        onBack={() => push(feedbackBackTo(searchParams))}
      />
    ),
  },
  {
    pattern: REVIEW_FEEDBACK_PATTERN,
    render: (_m, { push }) => (
      <Header title="🔄 復習フィードバック" onBack={() => push(ROUTES.HOME)} />
    ),
  },
  {
    pattern: REVIEW_COMPLETE_PATTERN,
    render: (_m, { push }) => (
      <Header title="✅ 復習完了" onBack={() => push(ROUTES.QUESTIONS)} />
    ),
  },
  {
    pattern: PROBLEM_QUESTION_PATTERN,
    render: (m) => (
      <DynamicProblemQuestionHeader
        themeLevelId={Number(m[1])}
        questionId={Number(m[2])}
      />
    ),
  },
  {
    pattern: REVIEW_PROBLEM_PATTERN,
    render: (m) => (
      <DynamicReviewProblemHeader
        reviewSetId={Number(m[1])}
        reviewSetQuestionId={Number(m[2])}
      />
    ),
  },
  {
    pattern: PROBLEM_LIST_PATTERN,
    render: (m) => <DynamicProblemListHeader themeLevelId={Number(m[1])} />,
  },
  // history はカレンダーボタン (年月シート) を内包する interactive Header (feature 側に委譲)
  { pattern: HISTORY_PATTERN, render: () => <HistoryHeader /> },
]

// (main) 全画面の Header。pathname を見て該当エントリを描画する。未登録 path は空ヘッダー (高さ 0)。
export function MainHeader() {
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  for (const { pattern, render } of HEADERS) {
    const match = pathname.match(pattern)
    if (match) return render(match, { push, searchParams })
  }
  return <Header />
}
