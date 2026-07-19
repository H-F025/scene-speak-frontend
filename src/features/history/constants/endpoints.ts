import { API_BASE_URL } from '@/shared/lib/constants'

// history feature が呼び出すバックエンドエンドポイント (一次情報源)。
// home/themes と同じく feature-local に API_BASE_URL から組み立てる。
// 複数オペレーションに拡張しうるため <FEATURE>_ENDPOINTS = { ... } 形式で保持する
export const HISTORY_ENDPOINTS = {
  list: `${API_BASE_URL}/histories`,
} as const
