'use client'

import { Toaster as SonnerToaster } from '@/application/components/ui/sonner'
import { UserProvider } from '../state/contexts/user-context'

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <UserProvider>
      <SonnerToaster />

      {children}
    </UserProvider>
  )
}
