import 'client-only'

import type { CacheStorageInterface } from '@/application/@interfaces/cache/cache-storage-interface'

export class LocalStorageAdapter implements CacheStorageInterface {
  set(key: string, value: object | string): void {
    if (localStorage) {
      if (value) {
        return localStorage.setItem(key, JSON.stringify(value))
      }

      return localStorage.removeItem(key)
    }
  }

  get(key: string): string | null {
    if (localStorage) {
      try {
        return JSON.parse(localStorage.getItem(key)!)
      } catch (e) {
        return null
      }
    }

    return null
  }

  delete(key: string): void {
    if (localStorage) {
      localStorage.removeItem(key)
    }
  }

  clear(): void {
    if (localStorage) {
      localStorage.clear()
    }
  }
}
