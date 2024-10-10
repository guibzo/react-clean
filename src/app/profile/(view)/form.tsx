'use client'

import { Input } from '@/components/form/input'
import { SubmitButton } from '@/components/form/submit-button'
import { useController } from '../controller'

export const Form = () => {
  const { onSubmit, inputs, isSubmitting } = useController()

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
