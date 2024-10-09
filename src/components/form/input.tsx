import { Input as InputComponent } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MaskProps } from '@react-input/mask'
import React, { ForwardedRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { MaskedInput } from '../ui/masked-input'

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  className?: string
  mask?: MaskProps
  avoidAutocomplete?: boolean
  defaultValue?: string
  value?: string
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
      ...register
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className='mb-3 grid w-full items-center gap-1.5'>
        {label && <Label>{label}</Label>}

        {mask ? (
          <MaskedInput
            {...register}
            ref={ref}
            placeholder={placeholder}
            mask={mask}
            className={className}
            defaultValue={defaultValue}
          />
        ) : (
          <InputComponent
            {...register}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={className}
            defaultValue={defaultValue}
            autoComplete={avoidAutocomplete ? 'one-time-code' : undefined}
          />
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
