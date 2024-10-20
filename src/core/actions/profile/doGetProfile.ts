'use server'

import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { httpFetchClient, type HttpFetchClientError } from '@/infra/http/fetch-client'
import type { INextFetchParams } from '../INextFetchParams'

type IDoGetProfileRequest = INextFetchParams & {
  id: string
}

type IDoGetProfileResponse =
  | {
      user: {
        name: string
        email: string
      }
    }
  | HttpFetchClientError

export async function doGetProfile({
  id,
  nextParams,
}: IDoGetProfileRequest): Promise<IDoGetProfileResponse> {
  const result: IDoGetProfileResponse = await httpFetchClient({
    method: 'GET',
    service: 'profile',
    path: `/users/${id}`,
    nextParams,
  })

  if ('error' in result) {
    return result
  }

  const cookies = new ServerCookiesAdapter()
  cookies.set('user', result)

  return result
}
