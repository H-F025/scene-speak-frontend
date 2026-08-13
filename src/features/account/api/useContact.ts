import { apiClient } from '@/shared/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { ACCOUNT_ENDPOINTS } from '../constants'
import type { ContactFormInput } from '../schemas/contact'
import type { ContactErrorResponse, ContactResponse } from '../types/contact'

// 429 のレスポンス body 型を AxiosError ジェネリックに乗せ、呼び出し側で error.response?.data.message を型安全に参照できるようにする
type ContactError = AxiosError<ContactErrorResponse>

const contactRequest = async (
  input: ContactFormInput,
): Promise<ContactResponse> => {
  const { data } = await apiClient.post<ContactResponse>(
    ACCOUNT_ENDPOINTS.contact,
    input,
  )
  return data
}

// 純粋な mutation。トースト・setError('root',...) 等は呼び出し側 (useContactForm) で onSuccess / onError に実装する
export const useContact = () =>
  useMutation<ContactResponse, ContactError, ContactFormInput>({
    mutationFn: contactRequest,
  })
