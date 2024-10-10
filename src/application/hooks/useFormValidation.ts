import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldErrors, useForm, type DefaultValues } from 'react-hook-form'
import { z as zod } from 'zod'

import { CustomFormResultToast } from '@/application/components/form-result-toast'
import { getSchemaShape } from '@/application/utils/getSchemaSchape'
import { FieldValues } from 'react-hook-form'

type UseFormValidationParams<T extends FieldValues> = {
  schema: zod.ZodObject<any> | zod.ZodEffects<zod.ZodObject<any>>
  errorMessages: { [key: string]: string }
  submit: (input: T) => Promise<void>
  defaultValues?: DefaultValues<T>
}

export function useFormValidation<T extends FieldValues>({
  schema,
  errorMessages,
  submit,
  defaultValues,
}: UseFormValidationParams<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

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
          showSubmitError(error.message)
          setIsSubmitting(false)
        }
      },
      async (errors: FieldErrors<T>) => {
        onError(errors)
        setIsSubmitting(false)
      },
    )()
  }

  const showSubmitSuccess = () => {
    CustomFormResultToast({
      variant: 'success',
    })
  }

  const showSubmitError = (error: string) => {
    CustomFormResultToast({
      variant: 'error',
      title: errorMessages[error] ?? 'Erro ao realizar a operação',
      description: 'Insira os dados corretamente',
    })
  }

  const onError = (errors: FieldErrors<zod.infer<typeof schema>>) => {
    const schemaShape = getSchemaShape(schema)

    if (schemaShape) {
      const schemaKeys = Object.keys(schemaShape)

      for (let key of schemaKeys) {
        const error = errors?.[key]?.message
        if (error) {
          showSubmitError(error.toString())
          break
        }
      }
    }
  }

  return {
    inputs: register,
    onSubmit,
    isSubmitting,
    setIsSubmitting,
    showSubmitError,
    resetFields: reset,
    control,
  }
}
