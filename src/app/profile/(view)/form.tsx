'use client'

import { Input } from '@/application/components/form/input'
import { SubmitButton } from '@/application/components/form/submit-button'
import { useController } from '../controller'

type FormInput = {
  name: 'neighbourhood' | 'id' | 'cep'
  label: string
  placeholder: string
  mask?: string
}

const formInputs: FormInput[] = [
  {
    name: 'neighbourhood',
    label: 'Bairro',
    placeholder: 'Centro',
  },
  {
    name: 'id',
    label: 'ID do usuário',
    placeholder: '1',
  },
  {
    name: 'cep',
    label: 'CEP',
    placeholder: '00000-000',
    mask: '99999-999',
  },
]

export const Form = () => {
  const { onSubmit, inputs, inputsMask, isSubmitting, returnableErrors } = useController()

  return (
    <>
      <form onSubmit={onSubmit}>
        {formInputs.map((input) => {
          const currentInputError = returnableErrors.find((err) => err.fieldName === input.name)
          const inputProps = input.mask ? inputsMask(input.name, input.mask) : inputs(input.name)

          return (
            <Input
              key={input.name}
              {...inputProps}
              label={input.label}
              placeholder={input.placeholder}
              showInputError
              returnableError={currentInputError}
            />
          )
        })}

        <SubmitButton label='Salvar' isSubmitting={isSubmitting} className='mt-4 w-full' />
      </form>
    </>
  )
}
