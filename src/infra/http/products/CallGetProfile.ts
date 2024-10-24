import type { INextFetchParams } from '@/core/actions/INextFetchParams'
import type { User } from '@/infra/@types/entities/User'
import { httpFetchClient, type HttpFetchClientError } from '../FetchClient'

type Params = INextFetchParams & {
  id: string
}

export const callGetProfile = async ({ nextParams, id }: Params) => {
  const result: User | HttpFetchClientError = await httpFetchClient({
    method: 'GET',
    service: 'v1',
    path: `users/${id}`,
    nextParams,
  })

  return result
}
