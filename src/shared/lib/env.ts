import { z } from 'zod'

// NEXT_PUBLIC_* は Next.js がビルド時に静的解析してインライン化するため、
// process.env のキーを必ずリテラルで参照する（動的アクセスはインライン化対象外）
const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_AUTH_COOKIE_NAME: z.string().min(1),
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_AUTH_COOKIE_NAME: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME,
})

if (!parsed.success) {
  const formatted = parsed.error.flatten().fieldErrors
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(formatted, null, 2)}\n` +
      'Check .env.local (local) or the deployment env (CI / Vercel).',
  )
}

export const env = parsed.data

// LAN IP (例: http://192.168.1.3:3000) 経由でアクセスした場合、API 側のホストが
// localhost 固定だと CSRF Cookie がページと異なるホストに紐付き document.cookie から
// 読めず CSRF token mismatch になる。ブラウザ実行時はページと同じホスト名を使うことで
// Cookie のホストを揃える (ポートは Cookie のスコープに含まれないため影響しない)
export const getApiBaseUrl = (): string => {
  if (typeof window === 'undefined') return env.NEXT_PUBLIC_API_URL

  const url = new URL(env.NEXT_PUBLIC_API_URL)
  url.hostname = window.location.hostname
  return url.origin
}
