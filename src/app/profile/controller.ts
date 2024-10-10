import { useFormValidation } from '@/hooks/useFormValidation'
import { doGetProfile } from '@/infra/actions/profile/_index'
import {
  changeAddressFormErrorMessages,
  changeAddressFormSchema,
} from './schema'
import type { TypeSchema } from './types'

export const useController = () => {
  const test = 'Hello world'

  const onGetProfile = async (formData: TypeSchema) => {
    await doGetProfile()
    console.log(formData)
  }

  const { inputs, onSubmit, isSubmitting } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: onGetProfile,
  })

  return {
    test,
    onSubmit,
    inputs,
    isSubmitting,
  }
}
