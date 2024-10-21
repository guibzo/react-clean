import type { z } from 'zod'
import type { changeAddressFormSchema } from './schemas'

export type TypeSchema = z.infer<typeof changeAddressFormSchema>
