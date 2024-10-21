import { z } from 'zod'

export const getSchemaShape = (schema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>) => {
  if (schema instanceof z.ZodObject) {
    return schema.shape
  }

  if (schema instanceof z.ZodEffects && schema._def.schema instanceof z.ZodObject) {
    return schema._def.schema.shape
  }

  throw new Error('Invalid schema type')
}
