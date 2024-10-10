import type { ICacheStorage } from '@/infra/_interfaces/cache/ICacheStorage'

const isClientSide = typeof window !== 'undefined'

export class LocalStorageAdapter implements ICacheStorage {
  set(key: string, value: object | string): void {
    if (isClientSide && localStorage) {
      if (value) {
        return localStorage.setItem(key, JSON.stringify(value))
      }

      return localStorage.removeItem(key)
    }
  }

  get(key: string): string | null {
    if (isClientSide && localStorage) {
      try {
        return JSON.parse(localStorage.getItem(key)!)
      } catch (e) {
        return null
      }
    }

    return null
  }

  delete(key: string): void {
    if (isClientSide && localStorage) {
      localStorage.removeItem(key)
    }
  }

  clear(): void {
    if (isClientSide && localStorage) {
      localStorage.clear()
    }
  }
}
