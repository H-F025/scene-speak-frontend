import { AUTH_QUERY_KEYS } from '@/features/auth'
import { apiClient } from '@/shared/lib/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { ACCOUNT_ENDPOINTS } from '../constants'
import type {
  UpdateEnglishLevelRequest,
  UpdateEnglishLevelResponse,
} from '../types/englishLevel'

const updateEnglishLevel = async (
  payload: UpdateEnglishLevelRequest,
): Promise<UpdateEnglishLevelResponse> => {
  const { data } = await apiClient.patch<UpdateEnglishLevelResponse>(
    ACCOUNT_ENDPOINTS.updateEnglishLevel,
    payload,
  )
  return data
}

// 英語レベル更新 mutation。トースト・マイページ遷移・setError は呼び出し側
// (useEnglishLevelForm) の onSuccess / onError に実装する。
// ただし user キャッシュの invalidate はデータ整合性の関心事のためここで行い、
// 更新後にマイページ等が古い english_level を表示しないようにする
export const useUpdateEnglishLevel = () => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateEnglishLevelResponse,
    AxiosError,
    UpdateEnglishLevelRequest
  >({
    mutationFn: updateEnglishLevel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user() })
    },
  })
}
