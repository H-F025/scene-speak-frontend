'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { ROUTES } from '@/shared/lib/constants'

// URL クエリ `?month=YYYY-MM` を選択年月の Single Source of Truth とする (リロード・共有・戻る/進むに対応)。
// ヘッダー (年月シート) と Content の双方がこの hook 経由で同期するため、両者で React state を共有しない。
const MONTH_QUERY_KEY = 'month'
const YEAR_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/

export function useHistoryMonth() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // 不正値 (手編集等) は無視して最新月扱い (undefined) にし、BE への 422 を防ぐ
  const rawMonth = searchParams.get(MONTH_QUERY_KEY)
  const yearMonth =
    rawMonth && YEAR_MONTH_PATTERN.test(rawMonth) ? rawMonth : undefined

  const selectYearMonth = (next: string) => {
    replace(`${ROUTES.HISTORY}?${MONTH_QUERY_KEY}=${next}`)
  }

  return { yearMonth, selectYearMonth }
}
