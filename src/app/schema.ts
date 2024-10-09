import { z } from 'zod'

export const changeAddressFormErrorMessages: { [key: string]: string } = {
  NEIGHBOURHOOD_IS_INVALID: 'O bairro deve ter pelo menos 4 caracteres',
}

export const changeAddressFormSchema = z.object({
  neighbourhood: z.string().trim().min(4, 'NEIGHBOURHOOD_IS_INVALID'),
})
