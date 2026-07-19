import type { ENGLISH_LEVEL, ENGLISH_LEVEL_LABEL } from '../constants'

// 定数の値から型を導出することで、定数と型を1箇所で同期させる
export type EnglishLevel = (typeof ENGLISH_LEVEL)[keyof typeof ENGLISH_LEVEL]
export type EnglishLevelLabel =
  (typeof ENGLISH_LEVEL_LABEL)[keyof typeof ENGLISH_LEVEL_LABEL]

// アプリ内で扱うユーザー表現。/login と /register のレスポンス user は同一構造
export interface User {
  user_id: number
  name: string
  email: string
  english_level: EnglishLevel
  english_level_label: EnglishLevelLabel
}

// POST /api/v1/auth/login 200 レスポンス
export interface LoginResponse {
  message: string
  user: User
}

// POST /api/v1/auth/login 401 レスポンス
export interface LoginErrorResponse {
  message: string
}

// POST /api/v1/auth/register リクエスト。
// english_level は english_levels.id (number) を送る (リクエスト側のみ id、レスポンスは code 文字列で返る非対称)
// password_confirmation は snake_case (バックエンド契約)。フロントの RegisterInput からは API 層で変換
export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  english_level: number
}

// POST /api/v1/auth/register 201 レスポンス
export interface RegisterResponse {
  message: string
  user: User
}

// POST /api/v1/auth/register 409 Conflict
export interface RegisterConflictResponse {
  message: string
}

// POST /api/v1/auth/register 422 Unprocessable Entity。
// errors はバックエンドが返すバリデーションエラー形式 (フィールド名 → メッセージ配列)
export interface RegisterValidationErrorResponse {
  message: string
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    english_level?: string[]
  }
}

// 409 と 422 の判別は status / errors の有無で行う (Discriminated Union ではなく Union)
export type RegisterErrorResponse =
  | RegisterConflictResponse
  | RegisterValidationErrorResponse

// GET /api/v1/auth/me が返す学習統計サマリ。
// useUser (TanStack Query) 経由でアプリ全体から参照される (ホーム画面の連続日数表示等で使用)
export interface UserStudySummary {
  consecutive_days: number
  conversation_count: number
  total_study_seconds: number
  total_study_time_label: string
}

// GET /api/v1/auth/me 200 レスポンス。user は login / register と同じ User 型を共有する
export interface UserResponse {
  user: User
  study_summary: UserStudySummary
}
