import type { Theme } from '../types/theme'

import { ThemeCard } from './ThemeCard'
import { ThemeEmpty } from './ThemeEmpty'

interface ThemeListProps {
  themes: Theme[]
}

// テーマカード一覧。空配列なら ThemeEmpty にフォールバックする
export function ThemeList({ themes }: ThemeListProps) {
  if (themes.length === 0) return <ThemeEmpty />

  return (
    <ul className="flex flex-col gap-2">
      {themes.map((theme) => (
        <li key={theme.id}>
          <ThemeCard theme={theme} />
        </li>
      ))}
    </ul>
  )
}
