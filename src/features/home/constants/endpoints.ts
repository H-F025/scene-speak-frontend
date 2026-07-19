import { API_BASE_URL } from '@/shared/lib/constants'

// home feature が呼び出すバックエンドエンドポイント (一次情報源)。
// 単数エンドポイントのため <RESOURCE>_ENDPOINT 形式で保持する
export const HOME_ENDPOINT = `${API_BASE_URL}/home`
