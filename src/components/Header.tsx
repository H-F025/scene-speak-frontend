'use client'

import type { ReactNode } from 'react'

import { ChevronLeft } from '@/components/icons'
import { Button } from '@/components/ui'

interface HeaderProps {
  title?: string
  onBack?: () => void
  rightSlot?: ReactNode
  // タイトル行の下に追加で固定表示したい要素 (例: 05_ProblemScreen の QuestionProgress)
  bottomSlot?: ReactNode
  // english.ui.json `nav` で `stroke.position: "bottom"` が指定された画面で true (例: problemList)
  withBottomBorder?: boolean
}

// (main) 配下共通の画面ヘッダー。
// `title` が指定された場合のみヘッダー本体 (h-14 / 56px) を描画する。
// `(main)/layout.tsx` の flex column 内に配置されることを前提に `sticky top-0` で上端追従。
// max-w は layout 側 (`max-w-97.5`) に一元化されており、Header 側では持たない。
// english.ui.json の navbar 仕様 (height 56, padding [0, 16]) に準拠
export function Header({
  title,
  onBack,
  rightSlot,
  bottomSlot,
  withBottomBorder = false,
}: HeaderProps) {
  return (
    <header
      className={
        withBottomBorder
          ? 'sticky top-0 z-40 border-b border-border-subtle bg-white'
          : 'sticky top-0 z-40 bg-white'
      }
    >
      {title !== undefined && (
        <div className="flex h-14 items-center justify-between px-4">
          {onBack ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              aria-label="戻る"
              className="size-10 rounded-full p-0 hover:bg-transparent"
            >
              <ChevronLeft aria-hidden className="size-6 text-primary-alt" />
            </Button>
          ) : (
            <span aria-hidden className="size-10" />
          )}
          <h1 className="text-[18px] font-semibold text-ink-900">{title}</h1>
          {rightSlot ?? <span aria-hidden className="size-10" />}
        </div>
      )}
      {bottomSlot}
    </header>
  )
}
