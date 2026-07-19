'use client'

import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { apiClient } from '@/shared/lib/apiClient'

import { learningSessionHeartbeatEndpoint } from '../constants'
import type { HeartbeatLearningSessionResponse } from '../types/learningSession'

// last_activity_at の更新間隔。BE 側の abandoned 自動判定タイマーより短い値を維持する
const HEARTBEAT_INTERVAL_MS = 30_000

const heartbeatRequest = async (
  learningSessionId: number,
): Promise<HeartbeatLearningSessionResponse> => {
  const { data } = await apiClient.post<HeartbeatLearningSessionResponse>(
    learningSessionHeartbeatEndpoint(learningSessionId),
  )
  return data
}

// 学習セッション中に 30 秒間隔で heartbeat を送信する side-effect hook。
// learningSessionId が undefined の間 (= 開始 API 未完了) は何もしない。
// 失敗時はサイレント (retry: 0) — heartbeat 取りこぼしは BE 側の abandoned 判定に委ね、
// ユーザーに 30 秒毎のトーストを出さない (skill 05-partial-failure)
export const useLearningSessionHeartbeat = (
  learningSessionId: number | undefined,
): void => {
  const { mutate } = useMutation<
    HeartbeatLearningSessionResponse,
    Error,
    number
  >({
    mutationFn: heartbeatRequest,
    retry: 0,
  })

  useEffect(() => {
    if (learningSessionId === undefined) return

    const intervalId = setInterval(() => {
      mutate(learningSessionId)
    }, HEARTBEAT_INTERVAL_MS)

    // unmount / learningSessionId 変更時に必ず clear。clear 漏れは多重 heartbeat を生む (skill 16-memory-leak)
    return () => clearInterval(intervalId)
  }, [learningSessionId, mutate])
}
