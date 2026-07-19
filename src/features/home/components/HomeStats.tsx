'use client'

interface HomeStatsProps {
  streakDays: number
  todayStudyTime: string
}

// 連続学習日数と本日の学習時間の 2 カードを横並びで表示する。
// 各カード内は english.ui.json の streakCard / timeCard 仕様 (3 要素縦並び:
// emoji / 数値 / ラベル) に準拠。timeCard は会話数カード追加 (BE conversation_count 待ち)
// で 3 カード化する想定だが、現状は 2 カードのまま JSON 通りの内訳で表示する
export function HomeStats({ streakDays, todayStudyTime }: HomeStatsProps) {
  return (
    <section className="flex h-32 gap-3">
      <article className="flex h-30.75 flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-2 py-4.5 shadow-sm">
        <span aria-hidden className="text-[26px] leading-none">
          🔥
        </span>
        <span className="text-[24px] font-semibold leading-none text-accent-orange">
          {streakDays}
        </span>
        <span className="text-[11px] text-ink-600-alt">連続学習日数</span>
      </article>
      <article className="flex h-30.75 flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-2 py-4.5 shadow-sm">
        <span aria-hidden className="text-[26px] leading-none">
          ⏱
        </span>
        <span className="text-[24px] font-semibold leading-none text-accent-green">
          {todayStudyTime}分
        </span>
        <span className="text-[11px] text-ink-600-alt">本日の学習時間</span>
      </article>
    </section>
  )
}
