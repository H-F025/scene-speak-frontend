'use client'

import * as React from 'react'
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

export interface FormItemContextValue {
  id: string
}

// <FormField> から渡される field 名のコンテキスト
export const FormFieldContext =
  React.createContext<FormFieldContextValue | null>(null)

// <FormItem> から渡される useId 由来の id コンテキスト
export const FormItemContext = React.createContext<FormItemContextValue | null>(
  null,
)

// <FormField> と <FormItem> の中で呼び出して、field の状態と各種 aria 用 id を取得する
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext)
    throw new Error('useFormField must be used within <FormField>')

  if (!itemContext)
    throw new Error('useFormField must be used within <FormItem>')

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  }
}
