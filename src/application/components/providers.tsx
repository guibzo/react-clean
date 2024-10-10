'use client'

import { Toaster as SonnerToaster } from '@/application/components/ui/sonner'

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <>
      <SonnerToaster />

      {children}
    </>
  )
}
