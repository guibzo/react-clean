import { cn } from '@/application/lib/cn'
import { MaskProps, useMask } from '@react-input/mask'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: MaskProps
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const inputRef = mask ? useMask(mask) : ref

    // @ts-ignore
    React.useImperativeHandle(ref, () => {
      const current = (inputRef as React.RefObject<HTMLInputElement>).current
      return current || null
    })

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors duration-100 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={inputRef}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
