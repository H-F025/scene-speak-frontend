'use client'

import { Dialog } from '@base-ui/react/dialog'

import { cn } from '@/shared/lib/utils'

// 画面下から せり上がる bottom sheet。
// プロジェクトは shadcn ではなく Base UI を採用しているため、shadcn Sheet 相当を Base UI Dialog で構成する。
// Dialog はデフォルトで modal (focus trap + scroll lock) かつ Backdrop / Escape での dismiss が効くため、
// ボトムシートに必要な挙動 (フォーカストラップ・Escape 閉じ・外側タップ閉じ) を追加実装なしで満たす。
// 開閉アニメーションは Base UI の data-[starting-style] / data-[ending-style] を Tailwind variant で制御する

function Sheet(props: Dialog.Root.Props) {
  return <Dialog.Root {...props} />
}

function SheetTrigger(props: Dialog.Trigger.Props) {
  return <Dialog.Trigger {...props} />
}

function SheetClose(props: Dialog.Close.Props) {
  return <Dialog.Close {...props} />
}

function SheetTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={cn('text-[17px] font-bold text-text-heading', className)}
      {...props}
    />
  )
}

function SheetContent({ className, children, ...props }: Dialog.Popup.Props) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <Dialog.Popup
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-97.5 flex-col gap-4 rounded-t-3xl bg-white px-5 pt-5 pb-8 shadow-lg transition-transform duration-300 data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full',
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetTitle, SheetContent }
