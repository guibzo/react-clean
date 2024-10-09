import type { z } from 'zod'
import type { changeAddressFormSchema } from './schema'

export type TypeSchema = z.infer<typeof changeAddressFormSchema>
