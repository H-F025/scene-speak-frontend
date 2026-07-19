import { Loader2 } from '@/components/icons'

type LoadingScreenProps = {
  // スクリーンリーダー向けの読み上げ文。視覚的には sr-only で隠す
  label?: string
}

const DEFAULT_LABEL = '読み込み中'

// 全画面共通の汎用ローディング UI。
// `fixed inset-0` でビューポート全面を覆い、親レイアウト (TabBar の有無等) に依存せず
// 常に画面中央にスピナーを固定する。App Router の `loading.tsx` / AuthBoundary 双方から
// 呼び出されてもズレが発生しない。ページ固有の形状にフィットさせたい場合は、
// ルート配下に独自の `loading.tsx` を置いて上書きする
export function LoadingScreen({ label = DEFAULT_LABEL }: LoadingScreenProps) {
  return (
    <output
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background"
    >
      <Loader2
        className="size-8 animate-spin text-primary-alt"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </output>
  )
}
