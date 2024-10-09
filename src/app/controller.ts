import type { TypeSchema } from './types'

export const useController = () => {
  const test = 'Hello world'

  const onSubmit = async (formData: TypeSchema) => {
    console.log(formData)
  }

  return {
    test,
    onSubmit,
  }
}
