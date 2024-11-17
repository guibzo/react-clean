/* 
	Updating cookies (delete/set/clear) shall be done either on **Server Actions** or **Route Handlers**, as it is not supported to  
	do so in client or server components.
	REF: https://nextjs.org/docs/app/api-reference/functions/cookies, https://github.com/andreizanik/cookies-next
*/

import 'client-only'

import type { ICacheStorage } from '@/infra/@interfaces/cache/ICacheStorage'
import { getCookie } from 'cookies-next'

export class ClientCookiesAdapter implements Partial<ICacheStorage> {
  get(key: string): string | null {
    try {
      const cookieValue = getCookie(key) ?? null
      return cookieValue ? JSON.parse(cookieValue) : null
    } catch (e) {
      return null
    }
  }
}
