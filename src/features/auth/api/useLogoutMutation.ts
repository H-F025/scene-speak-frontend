import { apiClient } from '@/shared/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { AUTH_ENDPOINTS } from '../constants'

interface LogoutResponse {
  message: string
}

const logoutRequest = async (): Promise<LogoutResponse> => {
  const { data } = await apiClient.post<LogoutResponse>(AUTH_ENDPOINTS.LOGOUT)
  return data
}

// 純粋な mutation。Cookie 削除 / 画面遷移は呼び出し側の useLogout に集約する
export const useLogoutMutation = () =>
  useMutation<LogoutResponse, AxiosError, void>({
    mutationFn: logoutRequest,
  })
