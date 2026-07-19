'use client'

import { useUser } from '@/features/auth'

import { useEnglishLevels } from '../api'
import { useEnglishLevelForm } from '../hooks'
import type { EnglishLevelOption } from '../types/englishLevel'
import { EnglishLevelForm } from './EnglishLevelForm'

// 英語レベル設定の Container。マスタ一覧 (useEnglishLevels) と現在ユーザー (useUser) を解決し、
// 現在レベル (code) をマスタと突き合わせて初期選択 id を導出する (code→id 変換)。
// useUser は (main)/layout.tsx が解決済みのため常にキャッシュヒットする (MyPageContent と同方針)。
// Header(nav) / TabBar は (main)/layout.tsx 側で描画するためここでは持たない
export function EnglishLevelContent() {
  const { data: levelsData } = useEnglishLevels()
  const { data: userData } = useUser()

  if (!userData) return null

  const levels = levelsData.english_levels
  const currentLevelId =
    levels.find((level) => level.code === userData.user.english_level)?.id ?? 0

  return (
    <EnglishLevelFormSection levels={levels} defaultLevelId={currentLevelId} />
  )
}

// defaultLevelId が確定してから form を初期化するため内側コンポーネントに分離する
// (useEnglishLevelForm の defaultValues は初回マウント時に固定されるため)
function EnglishLevelFormSection({
  levels,
  defaultLevelId,
}: {
  levels: EnglishLevelOption[]
  defaultLevelId: number
}) {
  const { form, handleSubmit, isPending } = useEnglishLevelForm(defaultLevelId)

  return (
    <EnglishLevelForm
      levels={levels}
      form={form}
      handleSubmit={handleSubmit}
      isPending={isPending}
    />
  )
}
