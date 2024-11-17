import { FieldError, FieldErrors } from 'react-hook-form'

type GetCurrentInputErrorParams = {
  inputErrors: FieldErrors
  errorMessages: Record<string, string>
  name: string
}

export const getCurrentInputError = ({
  errorMessages,
  inputErrors,
  name,
}: GetCurrentInputErrorParams) => {
  const inputErrorsArray: [string, FieldError | undefined][] = Object.entries(
    inputErrors || {},
  ).filter(([key, value]) => key !== 'root' && value !== undefined) as [
    string,
    FieldError | undefined,
  ][]

  const formattedInputErrors = inputErrorsArray.map(([key, value]) => {
    if (value && typeof value === 'object' && errorMessages) {
      const errorMsg = errorMessages[value.message as string]

      return {
        key,
        value: {
          ...value,
          message: errorMsg || value.message,
        },
      }
    }

    throw new Error('inputErrors must be an object with defined errors.')
  })

  const currentInputError = formattedInputErrors.find((err) => err.key === name)

  return currentInputError
}
