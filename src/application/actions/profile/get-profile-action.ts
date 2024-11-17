'use server'

import { ServerCookiesAdapter } from '@/app/cache/server-cookies-adapter'
import { callGetProfile } from '@/app/http'
import type { NextFetchParamsInterface } from '../next-fetch-params-interface'

export interface GetProfileRequest extends NextFetchParamsInterface {
  id: string
}

export async function getProfileAction({ id, nextParams }: GetProfileRequest) {
  const result = await callGetProfile({ nextParams, id })

  const cookies = new ServerCookiesAdapter()
  cookies.set('user', result)

  return result
}
