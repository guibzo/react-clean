import type { NextCookieOptions } from '@/application/@types/cache/next-cookie-options'

export interface CacheStorageInterface {
  get: (key: string) => string | null
  clear: () => void
  delete: (key: string) => void
  set: (key: string, value: object | string, options?: NextCookieOptions) => void
}
