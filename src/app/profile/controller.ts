import { useFormValidation } from '@/application/hooks/use-form-validation'
import type { User } from '@/infra/@types/entities/User'
import { GetProfileGateway } from '@/infra/gateways/GetProfileGateway'
import { useState } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { changeAddressFormErrorMessages, changeAddressFormSchema } from './schemas'
import type { TypeSchema } from './types'

export const useController = () => {
  const [user, setUser] = useState<User>()

  const onGetProfile = async (formData: TypeSchema) => {
    console.log(formData)
    const response = await GetProfileGateway({ id: formData.id })

    setUser(response)
  }

  const { inputs, onSubmit, isSubmitting, returnableErrors } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: onGetProfile,
    returnableErrorsType: 'multiple',
    hideErrorToast: true,
  })

  const inputsMask = useHookFormMask(inputs)

  return {
    onSubmit,
    inputs,
    inputsMask,
    isSubmitting,
    user,
    returnableErrors,
  }
}
