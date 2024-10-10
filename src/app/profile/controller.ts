import { useFormValidation } from '@/hooks/useFormValidation'
import { doGetProfile } from '@/infra/actions/profile/_index'
import { useHookFormMask } from 'use-mask-input'
import {
  changeAddressFormErrorMessages,
  changeAddressFormSchema,
} from './schema'
import type { TypeSchema } from './types'

export const useController = () => {
  const onGetProfile = async (formData: TypeSchema) => {
    await doGetProfile()
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
