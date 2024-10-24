import { GetProfileAction } from '@/core/actions'
import type { IGetProfileRequest } from '../@types/common/IGetProfile'

export async function GetProfileGateway({ id, nextParams }: IGetProfileRequest) {
  const result = await GetProfileAction({ nextParams, id })

  if ('error' in result) {
    console.error(result)
    throw new Error(result.error)
  }

  return result
}
