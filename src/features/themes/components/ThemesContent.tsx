'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useUser } from '@/features/auth'
import { ROUTES } from '@/shared/lib/constants'

import { useThemes } from '../api/useThemes'
import { type EnglishLevel, englishLevelSchema } from '../schemas/englishLevel'

import { LevelTabs } from './LevelTabs'
import { ThemeList } from './ThemeList'

// URL クエリ `?level=xxx` の Single Source of Truth 化に伴うキー名
const LEVEL_QUERY_KEY = 'level'

// URL クエリ `?level=xxx` を主要ソース、ユーザーの english_level (useUser cache) を fallback とする。
export function ThemesContent() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // TanStack Query は同 queryKey の in-flight も dedup するため、ここでの再呼び出しに
  // よる追加 fetch は発生しない (Zustand 等の global store を用意しない既存方針)
  const { data: userData } = useUser()
  const userLevel: EnglishLevel = userData!.user.english_level

  // useSearchParams は ReadonlyURLSearchParams (extends URLSearchParams) を返す。
  const rawLevel = searchParams.get(LEVEL_QUERY_KEY)
  const parsed = englishLevelSchema.safeParse(rawLevel)
  const urlLevel = parsed.success ? parsed.data : undefined

  // 効果レベル: URL クエリが優先、未指定 or 不正値ならユーザーの現在レベルにフォールバック
  const level: EnglishLevel = urlLevel ?? userLevel

  // URL クエリと LevelTabs の active 表示を mount 時に同期する。
  useEffect(() => {
    if (!urlLevel) {
      replace(`${ROUTES.THEMES}?${LEVEL_QUERY_KEY}=${userLevel}`)
    }
  }, [urlLevel, userLevel, replace])

  const { data } = useThemes(level)

  const handleLevelChange = (nextLevel: EnglishLevel) => {
    replace(`${ROUTES.THEMES}?${LEVEL_QUERY_KEY}=${nextLevel}`)
  }

  return (
    <main className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <LevelTabs current={level} onChange={handleLevelChange} />
      <ThemeList themes={data.themes} />
    </main>
  )
}
