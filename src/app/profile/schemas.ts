import { z } from 'zod'

export const changeAddressFormErrorMessages: { [key: string]: string } = {
  NEIGHBOURHOOD_IS_INVALID: 'O bairro deve ter pelo menos 4 caracteres',
  CEP_IS_INVALID: 'CEP inválido. Ex: 14230-500',
}

export const changeAddressFormSchema = z.object({
  neighbourhood: z.string().trim().min(4, 'NEIGHBOURHOOD_IS_INVALID'),
  cep: z
    .string()
    .trim()
    .min(9, 'CEP_IS_INVALID')
    .refine((val) => /^\d{5}-\d{3}$/.test(val), {
      message: 'CEP_IS_INVALID',
    }),
})
