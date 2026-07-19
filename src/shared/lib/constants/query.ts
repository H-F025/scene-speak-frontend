// TanStack Query のデフォルト設定値
export const QUERY_STALE_TIME_MS = 60 * 1000
// 変動頻度の低い参照系データ (user / home stats 等) で使う長めの staleTime。
// タブ間遷移や短時間の再 mount で再 fetch しない一方、5 分以内であれば自動 invalidate に追従する
export const QUERY_STALE_TIME_LONG_MS = 5 * 60 * 1000
export const QUERY_GC_TIME_MS = 5 * 60 * 1000
export const QUERY_DEFAULT_RETRY_COUNT = 1
