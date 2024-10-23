'use client'

import { Input } from '@/application/components/form/input'
import { SubmitButton } from '@/application/components/form/submit-button'
import { useController } from '../controller'

export const Form = () => {
  const { onSubmit, inputs, inputsMask, isSubmitting } = useController()

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input {...inputs('neighbourhood')} label='Bairro' placeholder='Centro' />
        <Input {...inputs('id')} label='ID do usuário' placeholder='1' />
        <Input {...inputsMask('cep', '99999-999')} label='CEP' placeholder='00000-000' />

        <SubmitButton label='Salvar' isSubmitting={isSubmitting} className='mt-4 w-full' />
      </form>
    </>
  )
}
