'use server'

import type { IGetProfileRequest } from '@/infra/@types/common/IGetProfile'
import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { callGetProfile } from '@/infra/http/products/CallGetProfile'

export async function GetProfileAction({ id, nextParams }: IGetProfileRequest) {
  const result = await callGetProfile({ nextParams, id })

  if ('error' in result) {
    return result
  }

  const cookies = new ServerCookiesAdapter()
  cookies.set('user', result)

  return result
}
