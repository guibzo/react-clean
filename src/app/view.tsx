'use client'

import { Input } from '@/components/form/input'
import { SubmitButton } from '@/components/form/submit-button'
import { useFormValidation } from '@/hooks/use-form-validation'
import { useController } from './controller'
import {
  changeAddressFormErrorMessages,
  changeAddressFormSchema,
} from './schema'
import type { TypeSchema } from './types'

// type ViewProps = ReturnType<typeof useController>

export const View = () => {
  const { onSubmit: controllerSubmit } = useController()

  const { inputs, onSubmit, isSubmitting } = useFormValidation<TypeSchema>({
    schema: changeAddressFormSchema,
    errorMessages: changeAddressFormErrorMessages,
    submit: controllerSubmit,
  })

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-4 p-5'>
      <h1 className='text-3xl font-bold'>Hello world!</h1>

      <form onSubmit={onSubmit}>
        <Input
          {...inputs('neighbourhood')}
          label='Bairro'
          placeholder='Centro'
        />

        <SubmitButton
          label='Salvar'
          isSubmitting={isSubmitting}
          className='mt-4 w-full'
        />
      </form>
    </div>
  )
}
