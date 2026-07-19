import { apiClient } from '@/shared/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import { REVIEW_SETS_ENDPOINT } from '../constants'
import type {
  StartReviewSetError,
  StartReviewSetResponse,
} from '../types/reviewSet'

const startReviewSet = async (): Promise<StartReviewSetResponse> => {
  const { data } =
    await apiClient.post<StartReviewSetResponse>(REVIEW_SETS_ENDPOINT)
  return data
}

// 純粋な mutation。/review-sets/[id]/questions/[qid] 遷移・409 トースト等は
// 呼び出し側 (StartReviewButton) で onSuccess / onError に実装する (useLogin / useRegister と同方針)
export const useStartReviewSet = () =>
  useMutation<StartReviewSetResponse, StartReviewSetError, void>({
    mutationFn: startReviewSet,
  })
