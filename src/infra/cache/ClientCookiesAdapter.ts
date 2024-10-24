import 'client-only'

import type { ICacheStorage } from '@/infra/@interfaces/cache/ICacheStorage'
import Cookies from 'js-cookie'
import type { DefaultCookieOptions } from '../@types/cache/DefaultCookieOptions'

export class ClientCookiesAdapter implements ICacheStorage {
  set(key: string, value: object | string, options?: DefaultCookieOptions | undefined): void {
    if (value) {
      Cookies.set(key, JSON.stringify(value), {
        secure: true,
        sameSite: 'None',
        ...options,
      })
    }

    return
  }

  get(key: string): string | null {
    try {
      return JSON.parse(Cookies.get(key)!)
    } catch (e) {
      return null
    }
  }

  delete(key: string): void {
    Cookies.remove(key)
  }

  clear(): void {
    for (const cookie in Cookies.get()) {
      Cookies.remove(cookie)
    }
  }
}
