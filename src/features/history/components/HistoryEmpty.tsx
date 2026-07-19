'use client'

interface HistoryEmptyProps {
  // 'all': 全期間で履歴なし / 'month': 選択月のみ履歴なし (統計は全期間値を保持)
  variant: 'all' | 'month'
}

// 空状態のメッセージ。エラーではなく UI の状態表現のため、文言は FE が所有する (BE message SSoT 対象外)
const EMPTY_MESSAGE = {
  all: 'まだ学習履歴がありません。\nまずはテーマを選んで会話練習を始めましょう。',
  month: 'この月の学習履歴はありません。',
} as const satisfies Record<HistoryEmptyProps['variant'], string>

export function HistoryEmpty({ variant }: HistoryEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <span aria-hidden className="text-[40px] leading-none">
        📭
      </span>
      <p className="whitespace-pre-line text-[14px] text-text-subtle">
        {EMPTY_MESSAGE[variant]}
      </p>
    </div>
  )
}
