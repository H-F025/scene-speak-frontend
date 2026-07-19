import { apiClient } from '@/shared/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import { AUTH_ENDPOINTS } from '../constants'
import type { LoginInput } from '../schemas/login'
import type { LoginError } from '../types/api'
import type { LoginResponse } from '../types/user'

const loginRequest = async (input: LoginInput): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(
    AUTH_ENDPOINTS.LOGIN,
    input,
  )
  return data
}

// 純粋な mutation。/home 遷移・setError('root',...)・トースト等は呼び出し側 (LoginForm) で onSuccess / onError に実装する
export const useLogin = () =>
  useMutation<LoginResponse, LoginError, LoginInput>({
    mutationFn: loginRequest,
  })
