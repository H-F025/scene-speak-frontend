import type { Metadata } from 'next'

import { PrivacyPolicyContent } from '@/features/account'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Scene Speak におけるプライバシーポリシーをご案内します。',
}

// (main)/mypage/privacy ページのエントリ。ユーザー固有データに依存しない静的な法定文書のため、
// contact と異なり dynamic = 'force-dynamic' は不要 (静的プリレンダリング可能)
export default function PrivacyPage() {
  return <PrivacyPolicyContent />
}
