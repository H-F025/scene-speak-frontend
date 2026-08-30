// テーマカードのアイコン (絵文字) と色は API レスポンスに含まれないため、
// フロント側で themes[].id をキーとした静的マッピングで解決する。
// 未マップ ID (バックエンド側でテーマが追加された等) は FALLBACK で安全に表示する。
// 将来 API へ icon / color フィールドが追加され次第このマッピングは廃止予定
//
// id とテーマ名の対応 (現行バックエンド seed 順):
// 1: カフェで注文 / 2: 空港でチェックイン / 3: ホテルで質問 /
// 4: 自己紹介 / 5: 仕事の打ち合わせ / 6: フリートーク / 7: 道を尋ねる /
// 8: 病院で症状を伝える

export interface ThemeAppearance {
  emoji: string
  bgColor: string
  iconColor: string
}

export const THEME_APPEARANCE_FALLBACK: ThemeAppearance = {
  emoji: '🎯',
  bgColor: '#F1F5F9',
  iconColor: '#64748B',
}

export const THEME_APPEARANCE_BY_ID: Readonly<Record<number, ThemeAppearance>> =
  {
    1: { emoji: '☕', bgColor: '#FFF7ED', iconColor: '#F97316' },
    2: { emoji: '✈️', bgColor: '#EFF6FF', iconColor: '#2563EB' },
    3: { emoji: '🏨', bgColor: '#F5F3FF', iconColor: '#7C3AED' },
    4: { emoji: '🙋', bgColor: '#FFF0F6', iconColor: '#EC4899' },
    5: { emoji: '💼', bgColor: '#ECFEFF', iconColor: '#0891B2' },
    6: { emoji: '🎲', bgColor: '#FFF7ED', iconColor: '#F97316' },
    7: { emoji: '🗺️', bgColor: '#F0FDF4', iconColor: '#16A34A' },
    8: { emoji: '🏥', bgColor: '#FEF2F2', iconColor: '#DC2626' },
  }

export const getThemeAppearance = (themeId: number): ThemeAppearance =>
  THEME_APPEARANCE_BY_ID[themeId] ?? THEME_APPEARANCE_FALLBACK
