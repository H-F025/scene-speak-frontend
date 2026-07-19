import { User } from '@/components/icons'

import type { QuestionDetail } from '../../types/problem'

interface SceneCardProps {
  question: QuestionDetail
}

// english.ui.json `situCard` (white / radius20 / padding18 / gap12) に準拠 (review 版)。
// 復習問題は見出しが「復習ポイント」固定 (practice は「シーン」固定)
export function SceneCard({ question }: SceneCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-[20px] bg-white p-4.5">
      <p className="text-[11px] font-bold text-primary-alt">復習ポイント</p>
      <div className="flex items-start gap-2.5">
        <div
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-bg-subtle"
        >
          <User className="size-4.5 text-brand" />
        </div>
        {/* 非対称 radius (左上 4 / 残り 14) で吹き出しを表現 */}
        <div className="flex flex-1 flex-col gap-1 rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl bg-bg-app px-3.5 py-3">
          <p className="text-[11px] font-semibold text-ink-500">
            {question.scene_label}
          </p>
          <p className="text-[15px] text-ink-900">{question.partner_message}</p>
        </div>
      </div>
      <hr aria-hidden className="h-px border-0 bg-page-50" />
      <p className="text-xs font-semibold text-ink-500">
        {question.instruction}
      </p>
      <div className="px-0 pt-2 pb-1">
        <p className="text-center text-[22px] font-bold text-ink-900">
          {question.question_text}
        </p>
      </div>
    </section>
  )
}
