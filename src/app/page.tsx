import type { Metadata } from 'next'
import Link from 'next/link'

import { BarChart3, MessageCircle, Sparkles, Target } from '@/components/icons'
import { GuestLoginButton } from '@/features/auth'
import { ROUTES } from '@/shared/lib/constants'

import { HeroPreviewCard } from './_components/HeroPreviewCard'
import { TopHeader } from './_components/TopHeader'

// TOP は layout.template ('%s | Scene Speak') を当てると 'Scene Speak | Scene Speak' になり冗長なため、
// title.absolute でテンプレ展開を打ち消す
export const metadata: Metadata = {
  title: { absolute: 'Scene Speak' },
  description:
    'Scene Speak はシーン別の英会話を楽しく学べる学習アプリ。日常会話・ビジネス英語など実践的なシーンでスピーキング練習ができます。',
}

const FEATURES = [
  {
    icon: MessageCircle,
    title: 'シーン別に練習できる',
    description:
      '空港・レストラン・商談など、実際に使う場面ごとに会話問題を用意。丸暗記ではなく「使える英語」が身につきます。',
  },
  {
    icon: Sparkles,
    title: 'その場でフィードバック',
    description:
      '回答するとすぐに正誤と解説が表示。なぜ間違えたのかまで理解してから次に進めます。',
  },
  {
    icon: Target,
    title: '苦手を自動で復習',
    description:
      '間違えた問題は苦手問題ノートに自動で蓄積。復習セットでピンポイントに弱点を克服できます。',
  },
  {
    icon: BarChart3,
    title: '学習の記録が見える',
    description:
      '学習時間や正答率を履歴で振り返り。積み上げが見えるからモチベーションが続きます。',
  },
] as const

const STEPS = [
  {
    step: '1',
    title: 'テーマを選ぶ',
    description: '英語レベルとシーンを選んで学習をスタート',
  },
  {
    step: '2',
    title: '会話に答える',
    description: '実践的な選択式の会話問題に回答',
  },
  {
    step: '3',
    title: 'フィードバックで復習',
    description: '解説を確認し、苦手は自動で復習セットへ',
  },
] as const

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <TopHeader />

      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        >
          <div className="absolute top-[-120px] left-1/2 size-90 -translate-x-[85%] rounded-full bg-brand-soft/60 blur-3xl" />
          <div className="absolute top-[-60px] right-1/2 size-90 translate-x-[85%] rounded-full bg-accent-orange-soft/30 blur-3xl" />
        </div>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 pt-10 pb-16 sm:pt-14 lg:grid-cols-2 lg:gap-10 lg:pb-24">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-semibold text-primary-dark">
              <Sparkles aria-hidden className="size-3.5" />
              シーン別 英会話学習アプリ
            </span>
            <h1 className="text-4xl leading-tight font-semibold text-text-heading sm:text-5xl">
              話したいシーンで、
              <br />
              話せるようになる。
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-text-body sm:text-base">
              日常会話からビジネス英語まで、実践的なシーンでスピーキングを練習。
              あなたの英語レベルに合わせて出題し、苦手は自動で復習できます。
            </p>
            <div className="flex w-full max-w-xs flex-col gap-3 pt-2 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={ROUTES.REGISTER}
                className="flex h-14 items-center justify-center rounded-[28px] bg-accent-orange-500 px-8 text-[16px] font-bold text-white transition-opacity hover:opacity-90 sm:w-56"
              >
                無料で始める
              </Link>
              <GuestLoginButton variant="cta" className="sm:w-56" />
            </div>
            <p className="text-[13px] text-text-subtle">
              すでにアカウントをお持ちの方は{' '}
              <Link
                href={ROUTES.LOGIN}
                className="font-semibold text-primary-alt"
              >
                ログイン
              </Link>
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroPreviewCard />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-text-heading">
            Scene Speak が選ばれる理由
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
            「使える英語」を身につけるための機能がそろっています。
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft">
                <Icon aria-hidden className="size-5 text-primary-alt" />
              </span>
              <h3 className="text-[17px] font-semibold text-text-heading">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 px-6 py-12">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-text-heading">
            はじめかたはシンプル
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div
                key={step}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand text-[15px] font-bold text-white">
                  {step}
                </span>
                <h3 className="text-[15px] font-semibold text-text-heading">
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-3xl bg-navy px-8 py-12 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            今すぐ、英会話の練習をはじめよう
          </h2>
          <p className="text-[14px] text-primary-100">
            登録は30秒。クレジットカードは不要です。
          </p>
          <div className="flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.REGISTER}
              className="flex h-14 items-center justify-center rounded-[28px] bg-accent-orange-500 px-8 text-[16px] font-bold text-white transition-opacity hover:opacity-90 sm:w-56"
            >
              無料で始める
            </Link>
            <GuestLoginButton variant="cta" className="sm:w-56" />
          </div>
          <Link
            href={ROUTES.LOGIN}
            className="text-[13px] font-semibold text-primary-100 underline-offset-4 hover:underline"
          >
            ログインはこちら
          </Link>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-[12px] text-text-subtle">
        © Scene Speak
      </footer>
    </div>
  )
}
