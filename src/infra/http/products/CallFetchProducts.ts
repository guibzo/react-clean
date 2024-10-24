import type { INextFetchParams } from '@/core/actions/INextFetchParams'
import type { Product } from '@/infra/@types/entities/Product'
import { httpFetchClient, type HttpFetchClientError } from '../FetchClient'

type Params = INextFetchParams

export const callFetchProducts = async ({ nextParams }: Params) => {
  const result: Product[] | HttpFetchClientError = await httpFetchClient({
    method: 'GET',
    service: 'v1',
    path: `products`,
    nextParams,
  })

  return result
}
