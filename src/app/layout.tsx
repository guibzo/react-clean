import { Providers } from '@/application/components/providers'
import '@/styles/global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt'>
      <body className='antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
