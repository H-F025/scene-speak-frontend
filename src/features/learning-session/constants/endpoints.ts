import { API_BASE_URL } from '@/shared/lib/constants'

// learning-session feature が呼び出すバックエンドエンドポイント (一次情報源)。
// 単数の root (= POST /learning-sessions) は <RESOURCE>_ENDPOINT、
// session_id を含む子リソースは factory 関数で揃える

// 学習セッション開始 (通常 / 復習共通)
export const LEARNING_SESSIONS_ENDPOINT = `${API_BASE_URL}/learning-sessions`

// 30秒ごとに送信する heartbeat。last_activity_at を更新する
export const learningSessionHeartbeatEndpoint = (
  learningSessionId: number,
): string => `${API_BASE_URL}/learning-sessions/${learningSessionId}/heartbeat`

// 中断 (abandoned) / 正常終了 (completed) を 1 エンドポイントで扱う。
// 区別は body の finish_reason で行う
export const learningSessionFinishEndpoint = (
  learningSessionId: number,
): string => `${API_BASE_URL}/learning-sessions/${learningSessionId}/finish`
