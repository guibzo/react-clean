import { Input as InputComponent } from '@/application/components/ui/input'
import { Label } from '@/application/components/ui/label'
import { cn } from '@/application/lib/cn'
import { getCurrentInputError } from '@/application/utils/get-current-input-error'
import { MaskProps } from '@react-input/mask'
import React, { ForwardedRef } from 'react'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  className?: string
  mask?: MaskProps
  avoidAutocomplete?: boolean
  defaultValue?: string
  value?: string
  highlightInputFieldOnError?: boolean
  showInputError?: boolean
  inputErrors?: FieldErrors
  errorMessages: Record<string, string>
} & UseFormRegisterReturn

export const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      className,
      mask,
      highlightInputFieldOnError,
      avoidAutocomplete,
      defaultValue,
      value,
      inputErrors,
      showInputError,
      errorMessages,
      ...register
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const currentInputError = getCurrentInputError({
      name: register.name,
      inputErrors: inputErrors || {},
      errorMessages,
    })
    const showCurrentInputError = showInputError && currentInputError

    return (
      <div className='mb-3 grid w-full items-center gap-1.5'>
        {label && <Label>{label}</Label>}

        <InputComponent
          {...register}
          ref={ref}
          placeholder={placeholder}
          type={type}
          mask={mask}
          className={cn(
            (showCurrentInputError || highlightInputFieldOnError) &&
              'border-red-500 placeholder:text-muted-foreground/50 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-red-500',
            className,
          )}
          defaultValue={defaultValue}
          autoComplete={avoidAutocomplete ? 'one-time-code' : undefined}
        />

        {showCurrentInputError && (
          <p className='text-sm text-red-500'>{currentInputError.value.message}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
