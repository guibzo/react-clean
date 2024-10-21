import type { DefaultCookieOptions } from './DefaultCookieOptions'

export interface NextCookieOptions extends DefaultCookieOptions {
  maxAge?: number
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  path?: string
  domain?: string
  expires?: Date
}
