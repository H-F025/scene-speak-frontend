import { API_BASE_URL } from '@/shared/lib/constants'

// account feature が呼び出すバックエンドエンドポイント (一次情報源)。
// history/home/themes と同じく feature-local に API_BASE_URL から組み立てる。
// englishLevels はマスタ一覧取得 (GET)、updateEnglishLevel は現在ユーザーのレベル更新 (PATCH)。
// 複数オペレーションを持つため <FEATURE>_ENDPOINTS = { ... } 形式で集約する
export const ACCOUNT_ENDPOINTS = {
  englishLevels: `${API_BASE_URL}/english-levels`,
  updateEnglishLevel: `${API_BASE_URL}/me/english-level`,
} as const
