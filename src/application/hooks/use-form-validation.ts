import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldErrors, FieldValues, useForm, type DefaultValues } from 'react-hook-form'
import { z as zod } from 'zod'

import { CustomFormResultToast } from '@/application/components/form-result-toast'
import { getSchemaShape } from '@/application/utils/get-schema-schape'

type UseFormValidationParams<T extends FieldValues> = {
  schema: zod.ZodObject<any> | zod.ZodEffects<zod.ZodObject<any>>
  errorMessages: { [key: string]: string }
  submit: (input: T) => Promise<void>
  defaultValues?: DefaultValues<T>
  returnableErrorsType?: 'multiple' | 'single'
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
  returnableErrorsType = 'single',
  hideErrorToast,
}: UseFormValidationParams<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [returnableErrors, setReturnableErrors] = useState<ReturnableError[]>([])

  const { register, handleSubmit, reset, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  // TO-DO: RESOLVER O PROBLEMA DE MANTER O ERRO APENAS SE O VALOR DO CAMPO AINDA ESTIVER INVÁLIDO

  // const watchedFields = useWatch({ control })
  // console.log('values', watchedFields)

  // useEffect(() => {
  //   setReturnableErrors((prevErrors) =>
  //     prevErrors.filter((error) => {
  //       const currentValue = watchedFields[error.fieldName as keyof T] as unknown

  //       // Validação do campo para determinar se o erro deve ser removido
  //       const fieldError = schema.safeParse({ [error.fieldName]: currentValue })

  //       // Mantém o erro apenas se o campo ainda estiver inválido
  //       return !fieldError.success
  //     }),
  //   )
  // }, [watchedFields, schema])

  console.log(returnableErrors)

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
    if (!schemaShape) return

    const schemaKeys = Object.keys(schemaShape)

    for (let key of schemaKeys) {
      const error = errors?.[key]?.message?.toString()
      if (!error) continue

      // @ts-ignore
      const fieldName = errors?.[key]?.ref?.name
      const errorMessage = errorMessages[error]

      setReturnableErrors((prevErrors) => {
        return prevErrors.some((err) => err.fieldName === fieldName)
          ? prevErrors
          : [...prevErrors, { fieldName, errorMessage }]
      })

      if (!hideErrorToast) showSubmitError(error)

      if (returnableErrorsType !== 'multiple') break
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
    returnableErrors,
  }
}
