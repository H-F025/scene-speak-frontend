'use client'

import { useState } from 'react'

import { ChevronLeft, ChevronRight } from '@/components/icons'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui'
import { cn } from '@/shared/lib/utils'

// 年セレクタの遡れる下限 (現在年から 5 年前まで)。それ以上古い履歴は本仕様では対象外
const SELECTABLE_YEARS_BACK = 5
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)

interface YearMonthPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // 現在選択中の年月 (undefined = 当月)
  selectedYearMonth: string | undefined
  onSelect: (yearMonth: string) => void
}

// 年月選択ボトムシート。
// 年は前後ボタンで切替 (未来年・5 年より前は不可)、月は 4 列グリッドで選択する。
// 当月より先の月は未来データが存在しないため無効化する
export function YearMonthPicker({
  open,
  onOpenChange,
  selectedYearMonth,
  onSelect,
}: YearMonthPickerProps) {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  // 選択中年月。未指定 (当月) は現在の年月をアクティブ表示の基準にする
  const selected = selectedYearMonth
    ? {
        year: Number(selectedYearMonth.split('-')[0]),
        month: Number(selectedYearMonth.split('-')[1]),
      }
    : { year: currentYear, month: currentMonth }

  const [displayedYear, setDisplayedYear] = useState(selected.year)

  const isMonthInFuture = (month: number) =>
    displayedYear > currentYear ||
    (displayedYear === currentYear && month > currentMonth)

  const handleSelectMonth = (month: number) => {
    onSelect(`${displayedYear}-${String(month).padStart(2, '0')}`)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-label="年月を選択">
        <SheetTitle>年月を選択</SheetTitle>

        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="前の年"
            disabled={displayedYear <= currentYear - SELECTABLE_YEARS_BACK}
            onClick={() => setDisplayedYear((year) => year - 1)}
            className="flex size-9 items-center justify-center rounded-full text-text-body disabled:opacity-30"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <span className="text-[16px] font-bold text-text-heading">
            {displayedYear}年
          </span>
          <button
            type="button"
            aria-label="次の年"
            disabled={displayedYear >= currentYear}
            onClick={() => setDisplayedYear((year) => year + 1)}
            className="flex size-9 items-center justify-center rounded-full text-text-body disabled:opacity-30"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {MONTHS.map((month) => {
            const isSelected =
              displayedYear === selected.year && month === selected.month
            const isDisabled = isMonthInFuture(month)
            return (
              <button
                key={month}
                type="button"
                disabled={isDisabled}
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => handleSelectMonth(month)}
                className={cn(
                  'flex h-11 items-center justify-center rounded-xl text-[14px] font-semibold transition-colors',
                  isSelected
                    ? 'bg-brand text-white'
                    : 'bg-bg-app text-text-body',
                  isDisabled && 'opacity-30',
                )}
              >
                {month}月
              </button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
