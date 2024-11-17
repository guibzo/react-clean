/* 
	Updating cookies (delete/set/clear) shall be done either on **Server Actions** or **Route Handlers**, as it is not supported to  
	do so in client or server components.
	REF: https://nextjs.org/docs/app/api-reference/functions/cookies, https://github.com/andreizanik/cookies-next
*/

import type { CacheStorageInterface } from '@/application/@interfaces/cache/cache-storage-interface'
import 'client-only'

import { getCookie } from 'cookies-next'

export class ClientCookiesAdapter implements Partial<CacheStorageInterface> {
  get(key: string): string | null {
    try {
      const cookieValue = getCookie(key) ?? null
      return cookieValue ? JSON.parse(cookieValue) : null
    } catch (e) {
      return null
    }
  }
}
