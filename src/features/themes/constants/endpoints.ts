import { API_BASE_URL } from '@/shared/lib/constants'

// themes feature が呼び出すバックエンドエンドポイント (一次情報源)。
// 単数エンドポイント (GET のみ) のため <RESOURCE>_ENDPOINT 形式で保持する
export const THEMES_ENDPOINT = `${API_BASE_URL}/themes`
