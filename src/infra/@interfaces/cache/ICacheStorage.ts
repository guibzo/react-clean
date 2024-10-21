import type { NextCookieOptions } from '@/infra/@types/NextCookieOptions'

export interface ICacheStorage {
  get: (key: string) => string | null
  clear: () => void
  delete: (key: string) => void
  set: (key: string, value: object | string, options?: NextCookieOptions) => void
}
