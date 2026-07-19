// (auth) ルートグループ共通レイアウト。
// LoginPage / RegisterPage 共通の wrapper (`flex flex-col gap-6`) + ビューポート縦中央寄せ +
// モバイル幅 (390px) max-w + 左右上下 padding を担う。
// task #6 で RootLayout を slim 化したことで、auth 寄りのスタイル (中央寄せ・max-w・padding) はここに集約された
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-97.5 flex-col gap-6">{children}</div>
    </div>
  )
}
