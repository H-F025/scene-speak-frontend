import type { AxiosError } from 'axios'
import { createContext } from 'react'

export interface ReviewSessionContextValue {
  learningSessionId: number | undefined
  isCompleting: boolean
  completeSession: (options: {
    onSuccess?: () => void
    onError?: (error: AxiosError) => void
  }) => void
  // 最終問題の解答送信時に BE が learning_session を自動 finish するため、
  // 完了画面側で finish API を呼ばずに「完了済み」フラグだけ立てたいケースで使う。
  // これを呼ばないと Provider unmount 時に abandoned が誤発火する
  markCompleted: () => void
}

// React Fast Refresh の制約により Context と Provider Component を同ファイルから両方 export すると
// HMR が壊れる (react-doctor/only-export-components)。Context オブジェクトはここに分離する
export const ReviewSessionContext =
  createContext<ReviewSessionContextValue | null>(null)
