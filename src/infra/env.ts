import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_DOMAIN: z.string(),
  BASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
