'use client'

import { useState } from 'react'

import { Header } from '@/components'
import { Calendar } from '@/components/icons'

import { useHistoryMonth } from '../hooks'

import { YearMonthPicker } from './YearMonthPicker'

// 学習履歴画面のヘッダー。他画面と同じく (main)/layout.tsx から描画され、共通 <Header> に
// タイトルとカレンダーボタン (年月選択シート起動) を配置する。
// 選択年月は URL クエリ (?month=) を SSoT とするため Content と React state を共有せず、
// シート開閉のみ本コンポーネントのローカル state で完結する。
export function HistoryHeader() {
  const { yearMonth, selectYearMonth } = useHistoryMonth()
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  return (
    <>
      <Header
        title="📚 学習履歴"
        rightSlot={
          <button
            type="button"
            aria-label="年月を選択"
            onClick={() => setIsPickerOpen(true)}
            className="flex size-10 items-center justify-center rounded-full text-brand"
          >
            <Calendar aria-hidden className="size-6" />
          </button>
        }
      />
      <YearMonthPicker
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        selectedYearMonth={yearMonth}
        onSelect={selectYearMonth}
      />
    </>
  )
}
