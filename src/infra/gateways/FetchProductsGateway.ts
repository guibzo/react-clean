import { FetchProductsAction } from '@/core/actions/profile/FetchProductsAction'
import type { IFetchProductsRequest } from '../@types/common/IFetchProducts'

export async function FetchProductsGateway({ nextParams }: IFetchProductsRequest) {
  const result = await FetchProductsAction({ nextParams })

  if ('error' in result) {
    console.error(result)
    throw new Error(result.error)
  }

  return result
}
