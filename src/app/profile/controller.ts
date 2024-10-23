import { useFormValidation } from '@/application/hooks/use-form-validation'
import { GetProfileAction } from '@/core/actions'
import type { User } from '@/infra/@types/User'
import { useState } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { changeAddressFormErrorMessages, changeAddressFormSchema } from './schemas'
import type { TypeSchema } from './types'

export const useController = () => {
  const [user, setUser] = useState<User>()

  const onGetProfile = async (formData: TypeSchema) => {
    const response = await GetProfileAction({ id: formData.id })

    if (response) {
      setUser(response)
    }
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
    user,
  }
}
