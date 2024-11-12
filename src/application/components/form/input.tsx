import { Input as InputComponent } from '@/application/components/ui/input'
import { Label } from '@/application/components/ui/label'
import type { ReturnableError } from '@/application/hooks/use-form-validation'
import { cn } from '@/application/lib/cn'
import { MaskProps } from '@react-input/mask'
import React, { ForwardedRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  className?: string
  mask?: MaskProps
  avoidAutocomplete?: boolean
  defaultValue?: string
  value?: string
  returnableError?: ReturnableError
  showInputError?: boolean
} & UseFormRegisterReturn

export const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      className,
      mask,
      avoidAutocomplete,
      defaultValue,
      value,
      returnableError,
      showInputError,
      ...register
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const isErrorBelongingToThisInput = returnableError?.fieldName === register.name

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
            showInputError &&
              isErrorBelongingToThisInput &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-red-500',
            className,
          )}
          defaultValue={defaultValue}
          autoComplete={avoidAutocomplete ? 'one-time-code' : undefined}
        />

        {showInputError && isErrorBelongingToThisInput && (
          <p className='text-sm text-red-500'>{returnableError.errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
