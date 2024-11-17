import { GetProfileAction } from '@/application/actions'
import { useFormValidation } from '@/application/hooks/use-form-validation'
import { useUser } from '@/application/state/contexts/user-context'
import { useHookFormMask } from 'use-mask-input'
import { changeAddressFormErrorMessages, changeAddressFormSchema } from './schemas'
import type { TypeSchema } from './types'

export const useController = () => {
  const { setUser } = useUser()

  const onGetProfile = async (formData: TypeSchema) => {
    console.log(formData)
    const response = await GetProfileAction({ id: formData.id })

    setUser(response)
  }

  const { inputs, onSubmit, isSubmitting, inputErrors } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: onGetProfile,
    toastErrorsShowType: 'multiple',
  })

  const inputsMask = useHookFormMask(inputs)

  return {
    onSubmit,
    inputs,
    inputsMask,
    isSubmitting,
    inputErrors,
  }
}
