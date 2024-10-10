import type { CookiesFn } from 'cookies-next/lib/types'

export const getCookiesStore = async () => {
  let cookiesStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')
    cookiesStore = serverCookies
  }

  return cookiesStore
}
