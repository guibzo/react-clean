'use server'

import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { httpFetchClient, type HttpFetchClientError } from '@/infra/http/FetchClient'
import type { INextFetchParams } from '../INextFetchParams'

type IGetProfileActionRequest = INextFetchParams & {
  id: string
}

type IGetProfileActionResponse =
  | {
      user: {
        name: string
        email: string
      }
    }
  | HttpFetchClientError

export async function GetProfileAction({
  id,
  nextParams,
}: IGetProfileActionRequest): Promise<IGetProfileActionResponse> {
  const result: IGetProfileActionResponse = await httpFetchClient({
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
