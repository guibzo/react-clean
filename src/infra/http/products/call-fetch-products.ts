import type { Product } from '@/application/@types/entities/product'
import type { NextFetchParamsInterface } from '@/application/actions/next-fetch-params-interface'
import { httpFetchClient } from '../fetch-client'

type Params = NextFetchParamsInterface

export const callFetchProducts = async ({ nextParams }: Params) => {
  try {
    const result: Product[] = await httpFetchClient({
      method: 'GET',
      service: 'v1',
      path: `products`,
      nextParams,
    })

    return result
  } catch (err) {
    console.error(err)
    throw new Error('CallFetchProducts failed')
  }
}
