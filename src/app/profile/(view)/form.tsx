'use client'

import { Input } from '@/components/form/input'
import { SubmitButton } from '@/components/form/submit-button'
import { useFormValidation } from '@/hooks/use-form-validation'
import { useController } from '../controller'
import {
  changeAddressFormErrorMessages,
  changeAddressFormSchema,
} from '../schema'
import type { TypeSchema } from '../types'

export const Form = () => {
  const { onSubmit: controllerSubmit } = useController()

  const { inputs, onSubmit, isSubmitting } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: controllerSubmit,
  })

  return (
    <form onSubmit={onSubmit}>
      <Input {...inputs('neighbourhood')} label='Bairro' placeholder='Centro' />

      <SubmitButton
        label='Salvar'
        isSubmitting={isSubmitting}
        className='mt-4 w-full'
      />
    </form>
  )
}
