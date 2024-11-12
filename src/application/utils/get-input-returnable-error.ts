import type { ReturnableError } from '../hooks/use-form-validation'

{
  /* 
    Example:
      <Input
        {...inputs('neighbourhood')}
        label='Bairro'
        placeholder='Centro'
        showInputError
        returnableError={getInputReturnableError('neighbourhood', returnableErrors)}
      /> 
  */
}

export const getInputReturnableError = (fieldName: string, returnableErrors: ReturnableError[]) => {
  return returnableErrors.find((err) => err.fieldName === fieldName)
}
