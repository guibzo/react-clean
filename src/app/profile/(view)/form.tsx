'use client'

import { Input } from '@/application/components/form/input'
import { SubmitButton } from '@/application/components/form/submit-button'
import type { FormInput } from '@/infra/@types/common/app/IFormInput'
import { useController } from '../controller'
import { changeAddressFormErrorMessages, type ChangeAddressFormSchemaKeys } from '../schemas'

type Input = FormInput & { name: ChangeAddressFormSchemaKeys }

const formInputs: Input[] = [
  {
    name: 'neighbourhood',
    label: 'Bairro',
    placeholder: 'Centro',
  },
  {
    name: 'id',
    label: 'ID do usuário',
    placeholder: '1',
    type: 'number',
  },
  {
    name: 'cep',
    label: 'CEP',
    placeholder: '00000-000',
    mask: '99999-999',
  },
]

export const Form = () => {
  const { onSubmit, inputs, inputsMask, isSubmitting, inputErrors } = useController()

  return (
    <>
      <form onSubmit={onSubmit}>
        {formInputs.map((input) => {
          const inputProps = input.mask
            ? inputsMask(input.name as typeof input.name, input.mask)
            : inputs(input.name as typeof input.name)

          return (
            <Input
              key={input.name}
              label={input.label}
              placeholder={input.placeholder}
              type={input.type}
              errorMessages={changeAddressFormErrorMessages}
              inputErrors={inputErrors}
              showInputError
              {...inputProps}
            />
          )
        })}

        <SubmitButton label='Salvar' isSubmitting={isSubmitting} className='mt-4 w-full' />
      </form>
    </>
  )
}
