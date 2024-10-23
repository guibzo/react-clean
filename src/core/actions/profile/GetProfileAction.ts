'use server'

import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { callGetProfile } from '@/infra/http/products/CallGetProfile'
import type { INextFetchParams } from '../INextFetchParams'

type IGetProfileActionRequest = INextFetchParams & {
  id: string
}

export async function GetProfileAction({ id, nextParams }: IGetProfileActionRequest) {
  const result = await callGetProfile({ nextParams, id })

  if ('error' in result) {
    console.error(result)
    return null
  }

  const cookies = new ServerCookiesAdapter()
  cookies.set('user', result)

  return result
}
