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
