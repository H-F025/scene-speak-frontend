import { hasCookie } from 'cookies-next/server'
import { NextResponse, type NextRequest } from 'next/server'
import { ROUTES } from './shared/lib/constants'
import { env } from './shared/lib/env'

// (auth) ルートグループに属するパス。未ログイン専用 — 認証済みアクセス時は /home へ
const AUTH_PATHS: readonly string[] = [ROUTES.LOGIN, ROUTES.REGISTER]
// (main) ルートグループに属するパスのプレフィックス。認証必須 — 未認証アクセス時は /login へ。
// 配下の動的ルート (/home/xxx 等) も含めて保護する
const PROTECTED_PATH_PREFIXES: readonly string[] = [ROUTES.HOME]

// middleware は「入口警備 (UX 用早期 redirect)」のみを担う。
// 本物の認証検証は (main)/layout.tsx の useUser (= TanStack Query 経由の GET /me) で行い、
// セッション失効時の cleanup は apiClient の 401 interceptor (clearAuthArtifacts + フルリロード) が担当する。
// middleware で /me を呼ばないことで Edge runtime の同期処理に閉じ、CORS / Origin ヘッダ等の事故を回避する
export const middleware = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const { pathname } = request.nextUrl
  const hasAuth = await hasCookie(env.NEXT_PUBLIC_AUTH_COOKIE_NAME, {
    req: request,
  })

  const isAuthPath = AUTH_PATHS.includes(pathname)
  const isProtectedPath = PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  // 保護パス: marker cookie が無ければ /login へ
  if (isProtectedPath && !hasAuth) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  // (auth) パス + marker cookie あり: /home へ。
  // marker が stale (BE session 失効) の場合は /home 遷移後 layout の useUser が 401 を受け、
  // apiClient interceptor がフルリロードで /login へ戻す (この時点で marker は削除される)
  if (isAuthPath && hasAuth) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
  }

  return NextResponse.next()
}

// matcher は静的アセット (_next/, favicon 等) を除外しつつ、(auth) / (main) 対象パスのみを評価する。
// 【重要】Next.js は `config.matcher` をビルド時に AST 静的解析するため、
// import した定数や変数式は識別不能 ("Unknown identifier" エラー) になる。
// したがって ROUTES を参照せずリテラル配列を直書きする必要がある。
// ROUTES (constants/routes.ts) を変更したらこの配列も併せて同期させること
export const config = {
  matcher: ['/login', '/register', '/home', '/home/:path*'],
}
