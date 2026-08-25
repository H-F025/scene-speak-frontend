import type { ReactNode } from 'react'

type PolicySection = {
  title: string
  body: ReactNode
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    title: '1. 収集する情報',
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          登録情報: 氏名、メールアドレス、パスワード（ハッシュ化して保存）
        </li>
        <li>学習情報: 英語レベル、学習履歴、学習時間、正答率、回答内容</li>
        <li>
          お問い合わせ情報:
          フォーム送信時の氏名・メールアドレス・お問い合わせ内容
        </li>
        <li>Cookie等: セッションの維持や認証状態の判定に用いるCookie</li>
      </ul>
    ),
  },
  {
    title: '2. 利用目的',
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>本サービスの提供、ログイン認証、学習進捗の記録・表示のため</li>
        <li>お問い合わせへの対応、ご連絡のため</li>
        <li>不正利用の防止、サービスの改善・品質向上のため</li>
      </ul>
    ),
  },
  {
    title: '3. Cookie等の利用について',
    body: (
      <p>
        本サービスは、ログイン状態の維持やCSRF対策のためCookieを利用します。これらは本サービスの提供に必要な範囲でのみ利用し、広告目的のトラッキングには利用しません。
      </p>
    ),
  },
  {
    title: '4. 第三者提供について',
    body: (
      <p>
        法令に基づく場合を除き、ご本人の同意なく取得した情報を第三者に提供することはありません。
      </p>
    ),
  },
  {
    title: '5. 委託について',
    body: (
      <p>
        利用目的の達成に必要な範囲において、情報の取り扱いの全部または一部を外部（クラウドサーバー事業者等）に委託する場合があります。その際は委託先に対して適切な監督を行います。
      </p>
    ),
  },
  {
    title: '6. 安全管理措置',
    body: (
      <p>
        取得した情報については、不正アクセス・紛失・破壊・改ざん・漏えい等を防止するため、適切な安全管理措置を講じます。
      </p>
    ),
  },
  {
    title: '7. 開示・訂正・削除等の請求',
    body: (
      <p>
        ご本人からの登録情報の開示・訂正・削除等のご請求については、お問い合わせフォームよりご連絡いただいた上で、本人確認の上、法令に従い対応いたします。
      </p>
    ),
  },
  {
    title: '8. プライバシーポリシーの変更',
    body: (
      <p>
        本ポリシーの内容は、法令の変更やサービス内容の変更等に応じて、予告なく改定される場合があります。改定後の内容は本画面に掲載した時点から効力を生じるものとします。
      </p>
    ),
  },
  {
    title: '9. お問い合わせ窓口',
    body: (
      <p>
        本ポリシーに関するお問い合わせは、マイページ内の「ヘルプ・お問い合わせ」フォームよりご連絡ください。
      </p>
    ),
  },
]

const POLICY_ESTABLISHED_DATE = '2026年8月26日'

// プライバシーポリシー画面。ユーザー固有データに依存しない静的な法定文書のため、
// バックエンド SSoT 方針の対象外 (ContactForm 等の動的ラベルとは性質が異なる) とし、
// 内容はここに直接記述する。レイアウトは ContactForm (見出し + 説明文 + カード) に合わせる
export function PrivacyPolicyContent() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[18px] font-semibold text-text-heading">
          プライバシーポリシー
        </h2>
        <p className="text-[14px] leading-relaxed text-text-subtle">
          制定日: {POLICY_ESTABLISHED_DATE}
        </p>
      </div>

      <section className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm">
        {POLICY_SECTIONS.map(({ title, body }) => (
          <div key={title} className="flex flex-col gap-1.5">
            <h3 className="text-[15px] font-semibold text-text-heading">
              {title}
            </h3>
            <div className="text-[14px] leading-relaxed text-text-body">
              {body}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
