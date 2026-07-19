import type { ReactNode } from 'react'

interface BottomBarProps {
  // BottomBar 本体の上に重ねる任意 slot (hint パネル / 補足メッセージ等)
  topSlot?: ReactNode
  // BottomBar 本体の中身 (CTA ボタン群等)
  children: ReactNode
}

// 画面下部固定アクションバーのシェル。
// practice / review / feedback など複数 feature で再利用するため src/components/ 直下に昇格 (Rule of Three 達成)。
export function BottomBar({ topSlot, children }: BottomBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-23.75 z-30 mx-auto w-full max-w-97.5">
      {topSlot}
      <div className="flex items-center gap-3 bg-page-50 px-4 py-3">
        {children}
      </div>
    </div>
  )
}
