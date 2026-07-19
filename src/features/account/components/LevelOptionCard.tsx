import { cn } from '@/shared/lib/utils'

import type { EnglishLevelOption } from '../types/englishLevel'

// レベル別のアイコン配色。themes の ThemeBadge (ENGLISH_LEVEL_BADGE_STYLE) と色を統一する
// (難易度の慣例色: beginner=green / intermediate=amber / advanced=red)。
// feature 間の依存逆流を避けるため値はこのカードに直書きする (themes barrel 非公開・YAGNI)
const LEVEL_ICON_APPEARANCE: Record<EnglishLevelOption['code'], string> = {
  beginner: 'bg-[#DCFCE7] text-[#16A34A]',
  intermediate: 'bg-[#FEF3C7] text-[#D97706]',
  advanced: 'bg-[#FEE2E2] text-[#DC2626]',
}

interface LevelOptionCardProps {
  option: EnglishLevelOption
  selected: boolean
}

// 英語レベル選択カード (1 箇所目実装)。選択/非選択を fill・stroke の差分で表現する単一コンポーネント。
// ToggleGroupItem の子として描画され、選択状態は親の form 値から渡される selected で制御する
export function LevelOptionCard({ option, selected }: LevelOptionCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2.5 rounded-[16px] border-[1.5px] p-4 text-left transition-colors',
        selected
          ? 'border-brand bg-brand-soft'
          : 'border-border-subtle bg-white',
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold',
            LEVEL_ICON_APPEARANCE[option.code],
          )}
        >
          {option.name.slice(0, 1)}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-text-subtle">
            {option.name}
          </span>
          <span className="text-[16px] font-bold text-text-heading">
            {option.description}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="shrink-0 text-[12px] font-bold text-accent-green">
          例
        </span>
        <span className="text-[12px] text-text-subtle">
          {option.example_sentence}
        </span>
      </div>
    </div>
  )
}
