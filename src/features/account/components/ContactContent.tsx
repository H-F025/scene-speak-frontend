'use client'

import { useUser } from '@/features/auth'

import { useContactForm } from '../hooks'
import { ContactForm } from './ContactForm'

// お問い合わせ画面の Container。ユーザー情報は auth の useUser を再利用する (queryKey 共有で dedup)。
// (main)/layout.tsx が描画前に useUser を解決済みのため、ここでは常にキャッシュヒットする
// (MyPageContent / EnglishLevelContent と同方針)。名前・メールを初期値にフォームを組み立てる
export function ContactContent() {
  const { data } = useUser()

  if (!data) return null

  return <ContactFormSection name={data.user.name} email={data.user.email} />
}

// defaultValues が確定してから form を初期化するため内側コンポーネントに分離する
// (useContactForm の defaultValues は初回マウント時に固定されるため、EnglishLevelContent と同方針)
function ContactFormSection({ name, email }: { name: string; email: string }) {
  const { form, handleSubmit } = useContactForm({ name, email, message: '' })

  return <ContactForm form={form} handleSubmit={handleSubmit} />
}
