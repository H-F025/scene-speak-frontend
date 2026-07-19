import { apiClient } from '@/shared/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import { AUTH_ENDPOINTS } from '../constants'
import type { RegisterInput } from '../schemas/register'
import type { RegisterError } from '../types/api'
import type { RegisterRequest, RegisterResponse } from '../types/user'

const registerRequest = async (
  input: RegisterInput,
): Promise<RegisterResponse> => {
  // フォームの camelCase (RegisterInput) を API 契約の snake_case (RegisterRequest) に変換する
  const payload: RegisterRequest = {
    name: input.name,
    email: input.email,
    password: input.password,
    password_confirmation: input.passwordConfirmation,
    english_level: input.englishLevel,
  }
  const { data } = await apiClient.post<RegisterResponse>(
    AUTH_ENDPOINTS.REGISTER,
    payload,
  )
  return data
}

// 純粋な mutation。/home 遷移・setError(...)・トースト等は呼び出し側 (useRegisterForm) で onSuccess / onError に実装する
export const useRegister = () =>
  useMutation<RegisterResponse, RegisterError, RegisterInput>({
    mutationFn: registerRequest,
  })
