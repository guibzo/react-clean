import { useFormValidation } from '@/application/hooks/use-form-validation'
import { GetProfileAction } from '@/core/actions'
import { useHookFormMask } from 'use-mask-input'
import { changeAddressFormErrorMessages, changeAddressFormSchema } from './schemas'
import type { TypeSchema } from './types'

export const useController = () => {
  const onGetProfile = async (formData: TypeSchema) => {
    await GetProfileAction({ id: '123' })
    console.log(formData)
  }

  const { inputs, onSubmit, isSubmitting } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: onGetProfile,
  })

  const inputsMask = useHookFormMask(inputs)

  return {
    onSubmit,
    inputs,
    inputsMask,
    isSubmitting,
  }
}
