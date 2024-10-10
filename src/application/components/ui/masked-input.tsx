import { cn } from '@/application/lib/cn'
import { MaskProps, useMask } from '@react-input/mask'
import React from 'react'

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: MaskProps
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const maskRef = useMask(mask)

    React.useImperativeHandle(ref, () => {
      const current = maskRef.current as HTMLInputElement
      return {
        ...current,
        value: current?.value || '',
      }
    })

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input border-zinc-300 bg-background px-4 py-[22px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:py-5',
          className,
        )}
        ref={maskRef}
        {...props}
      />
    )
  },
)
MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }
