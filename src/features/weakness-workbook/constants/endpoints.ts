import { API_BASE_URL } from '@/shared/lib/constants'

// weakness-workbook feature が呼び出すバックエンドエンドポイント (一次情報源)。
// GET (取得) と POST (作成) で同一 URL のため、単数エンドポイント命名 (<RESOURCE>_ENDPOINT) を採用する
export const REVIEW_SETS_ENDPOINT = `${API_BASE_URL}/review-sets`
