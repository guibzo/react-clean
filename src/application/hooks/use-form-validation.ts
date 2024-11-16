import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldErrors, FieldValues, useForm, type DefaultValues } from 'react-hook-form'
import { z as zod } from 'zod'

import { CustomFormResultToast } from '@/application/components/form-result-toast'
import { getSchemaShape } from '../utils/get-schema-schape'

type UseFormValidationParams<T extends FieldValues> = {
  schema: zod.ZodObject<any> | zod.ZodEffects<zod.ZodObject<any>>
  errorMessages: { [key: string]: string }
  submit: (input: T) => Promise<void>
  defaultValues?: DefaultValues<T>
  toastErrorsShowType?: 'multiple' | 'single'
  hideErrorToast?: boolean
}

export type ReturnableError = {
  fieldName: string
  errorMessage: string
}

export function useFormValidation<T extends FieldValues>({
  schema,
  errorMessages,
  submit,
  defaultValues,
  toastErrorsShowType = 'single',
  hideErrorToast,
}: UseFormValidationParams<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, control, formState } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const showSubmitSuccess = () => {
    CustomFormResultToast({
      variant: 'success',
    })
  }

  const showToastError = (error: string) => {
    CustomFormResultToast({
      variant: 'error',
      title: errorMessages[error] ?? 'Erro ao realizar a operação',
      description: 'Verifique os dados e tente novamente',
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    handleSubmit(
      async (input: T) => {
        try {
          await submit(input)
          showSubmitSuccess()
          setIsSubmitting(false)
          reset()
        } catch (error: any) {
          showToastError(error.message)
          setIsSubmitting(false)
          console.log(error)
        }
      },
      async (errors: FieldErrors<T>) => {
        onError(errors)
        setIsSubmitting(false)
      },
    )()
  }

  const onError = (errors: FieldErrors<zod.infer<typeof schema>>) => {
    const schemaShape = getSchemaShape(schema)
    if (!schemaShape) return

    const schemaKeys = Object.keys(schemaShape)

    for (let key of schemaKeys) {
      const error = errors?.[key]?.message?.toString()
      if (!error) continue

      if (!hideErrorToast) showToastError(error)

      if (toastErrorsShowType !== 'multiple') break
    }
  }

  return {
    inputs: register,
    onSubmit,
    isSubmitting,
    setIsSubmitting,
    showToastError,
    resetFields: reset,
    control,
    inputErrors: formState.errors,
  }
}
