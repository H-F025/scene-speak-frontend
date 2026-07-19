'use client'

import { use } from 'react'

import { ReviewSessionContext } from '../providers/reviewSessionContext'

// ReviewSessionProvider 配下でのみ呼べる consumer hook。
// Provider 外から呼ばれた場合は明示的に throw して設定ミスを早期検出する
export function useReviewSession() {
  const context = use(ReviewSessionContext)
  if (context === null) {
    throw new Error(
      'useReviewSession must be used within <ReviewSessionProvider>',
    )
  }
  return context
}
