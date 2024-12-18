/* 
	Updating cookies (delete/set/clear) shall be done either on **Server Actions** or **Route Handlers**, as it is not supported to  
	do so in client or server components.
	REF: https://nextjs.org/docs/app/api-reference/functions/cookies, https://github.com/andreizanik/cookies-next
*/

import 'server-only'

import type { CacheStorageInterface } from '@/application/@interfaces/cache/cache-storage-interface'
import type { NextCookieOptions } from '@/application/@types/cache/next-cookie-options'
import { deleteCookie, getCookie, getCookies, setCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export class ServerCookiesAdapter implements CacheStorageInterface {
  get(key: string): string | null {
    try {
      const cookieValue = getCookie(key, { cookies }) ?? null
      return cookieValue ? JSON.parse(cookieValue) : null
    } catch (e) {
      return null
    }
  }

  set(key: string, value: string | object, options?: NextCookieOptions | undefined): void {
    try {
      setCookie(key, JSON.stringify(value), {
        cookies,
        ...options,
      })
    } catch (err) {
      console.error('Error setting cookie', err)
    }
  }

  delete(key: string): void {
    try {
      deleteCookie(key, { cookies })
    } catch (err) {
      console.error('Error deleting cookie', err)
    }
  }

  clear(): void {
    for (const cookie in getCookies({ cookies })) {
      this.delete(cookie)
    }
  }
}
