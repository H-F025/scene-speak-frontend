import { Toaster } from '@/components/ui'
import { QueryProvider } from '@/shared/providers'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../shared/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// title.template により子 page で `title: 'X'` と書くだけで `<title>X | Scene Speak</title>` に展開される。
// サイト名変更時はこの 1 箇所だけ修正すれば全 page に反映される (SSOT)
export const metadata: Metadata = {
  title: {
    default: 'Scene Speak',
    template: '%s | Scene Speak',
  },
  description:
    'シーン別の英会話を楽しく学べる学習アプリ。実践的なシーンでスピーキングを練習しよう。',
}

// 全画面共通の <main> ラッパー (枠だけ提供)。
// auth 系の中央寄せ + max-w 制限は (auth)/layout.tsx、(main) 系の max-w 中央寄せは (main)/layout.tsx で個別に担う。
// RootLayout に padding / max-w を持たせると (main) 配下も全部 342px に狭められて NavBar 等が画面端まで広がらないため、
// route group ごとに layout 責務を分離する設計に切り替えた (spec-004 task #6 参照)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <main className="min-h-svh bg-page-50">{children}</main>
          <Toaster theme="light" richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  )
}
