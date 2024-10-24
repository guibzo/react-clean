'use server'

import type { IFetchProductsRequest } from '@/infra/@types/common/IFetchProduts'
import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { callFetchProducts } from '@/infra/http/products/CallFetchProducts'

export async function FetchProductsAction({ nextParams }: IFetchProductsRequest) {
  const result = await callFetchProducts({ nextParams })

  if ('error' in result) {
    return result
  }

  const cookies = new ServerCookiesAdapter()
  cookies.set('productOne', result[10])

  return result
}
