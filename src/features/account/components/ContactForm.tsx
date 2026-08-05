'use client'

import { ActionButton } from '@/components'
import { Mail } from '@/components/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui'
import type { UseFormReturn } from 'react-hook-form'

import type { ContactFormInput } from '../schemas/contact'

interface ContactFormProps {
  form: UseFormReturn<ContactFormInput>
  handleSubmit: () => void
}

const FIELD_INPUT_CLASS =
  'h-13 rounded-xl border-[1.5px] border-primary-100 px-4 py-0 text-[15px] placeholder:text-[15px] placeholder:text-ink-400-alt md:text-[15px]'

// お問い合わせフォーム (presentational)。状態・副作用は useContactForm に集約済み。
// レイアウトは EnglishLevelForm (見出し + 説明文 + 入力群 + CTA) と同方針、
// 個々の入力欄は auth の TextField と同じ FormItem/FormLabel/FormControl/FormMessage 構成を踏襲する
export function ContactForm({ form, handleSubmit }: ContactFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 p-5"
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[18px] font-semibold text-text-heading">
            お問い合わせ
          </h2>
          <p className="text-[14px] leading-relaxed text-text-subtle">
            ご質問・ご要望・不具合報告など、お気軽にお送りください。
          </p>
        </div>

        <section className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormLabel className="text-[13px] font-semibold text-ink-700-alt">
                  お名前
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="山田 太郎"
                    autoComplete="name"
                    className={FIELD_INPUT_CLASS}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormLabel className="text-[13px] font-semibold text-ink-700-alt">
                  メールアドレス
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    inputMode="email"
                    className={FIELD_INPUT_CLASS}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormLabel className="text-[13px] font-semibold text-ink-700-alt">
                  お問い合わせ内容
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="rounded-xl border-[1.5px] border-primary-100 px-4 py-3 text-[15px] placeholder:text-[15px] placeholder:text-ink-400-alt md:text-[15px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <ActionButton
          type="submit"
          leadingIcon={<Mail aria-hidden className="size-5" />}
        >
          送信する
        </ActionButton>
      </form>
    </Form>
  )
}
