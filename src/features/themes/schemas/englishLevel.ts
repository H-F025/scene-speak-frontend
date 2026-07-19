import { z } from 'zod'

// 英語レベルの zod スキーマ (SSoT)。
// バックエンド (`GET /api/v1/themes` の english_level クエリおよびレスポンス) と同一の値域。
// URL クエリ `?level=xxx` の検証にも使うため feature 共有の schemas に置く
export const englishLevelSchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
])

// EnglishLevel 型は zod スキーマから推論する (CLAUDE.md「zod を SSoT とする」原則)
export type EnglishLevel = z.infer<typeof englishLevelSchema>
