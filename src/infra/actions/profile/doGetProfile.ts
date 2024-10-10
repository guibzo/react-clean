'use server'

import { ServerCookiesAdapter } from '@/infra/cache/_index'

export async function doGetProfile() {
  const cookies = new ServerCookiesAdapter()

  const result = cookies.set('user', { name: 'John Doe' })

  return result
}
