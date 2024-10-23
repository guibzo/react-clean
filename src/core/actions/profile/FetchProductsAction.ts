'use server'

import { ServerCookiesAdapter } from '@/infra/cache/ServerCookiesAdapter'
import { callFetchProducts } from '@/infra/http/products/CallFetchProducts'
import type { INextFetchParams } from '../INextFetchParams'

type IFetchProductsActionRequest = INextFetchParams

export async function FetchProductsAction({ nextParams }: IFetchProductsActionRequest) {
  const result = await callFetchProducts({ nextParams })

  if ('error' in result) {
    console.error(result)
    return []
  }

  const cookies = new ServerCookiesAdapter()
  cookies.set('productOne', result[10])

  return result
}
