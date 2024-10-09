'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type SubmitButtonVariant =
  | 'secondary'
  | 'destructive'
  | 'default'
  | 'outline'
  | 'ghost'
  | 'link'

type SubmitButtonProps = {
  label: string
  isSubmitting: boolean
  variant?: SubmitButtonVariant
  className?: string
}

export function SubmitButton({
  label,
  isSubmitting,
  variant = 'default',
  className,
}: SubmitButtonProps) {
  return (
    <Button
      disabled={isSubmitting}
      variant={variant}
      className={className}
      type='submit'
    >
      {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {label}
    </Button>
  )
}
