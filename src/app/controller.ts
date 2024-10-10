import { doGetWorker } from '@/infra/server-actions/random/_index'
import type { TypeSchema } from './types'

export const useController = () => {
  const test = 'Hello world'

  const onSubmit = async (formData: TypeSchema) => {
    await doGetWorker()
    console.log(formData)
  }

  return {
    test,
    onSubmit,
  }
}
