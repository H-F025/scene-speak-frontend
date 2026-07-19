import type { Metadata } from 'next'

// TOP は layout.template ('%s | Scene Speak') を当てると 'Scene Speak | Scene Speak' になり冗長なため、
// title.absolute でテンプレ展開を打ち消す
export const metadata: Metadata = {
  title: { absolute: 'Scene Speak' },
  description:
    'Scene Speak はシーン別の英会話を楽しく学べる学習アプリ。日常会話・ビジネス英語など実践的なシーンでスピーキング練習ができます。',
}

export default function Home() {
  return <h1 className="text-4xl font-semibold">Scene Speak</h1>
}
