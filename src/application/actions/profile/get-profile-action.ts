'use server'

import { ServerCookiesAdapter } from '@/infra/cache'
import { callGetProfile } from '@/infra/http'
import type { NextFetchParamsInterface } from '../next-fetch-params-interface'

export interface GetProfileRequest extends NextFetchParamsInterface {
  id: string
}

export async function GetProfileAction({ id, nextParams }: GetProfileRequest) {
  const result = await callGetProfile({ nextParams, id })

  const cookies = new ServerCookiesAdapter()
  cookies.set('user', result)

  return result
}
