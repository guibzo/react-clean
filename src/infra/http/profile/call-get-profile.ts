import type { User } from '@/application/@types/entities/user'
import type { NextFetchParamsInterface } from '@/application/actions/next-fetch-params-interface'
import { httpFetchClient } from '../fetch-client'

type Params = NextFetchParamsInterface & {
  id: string
}

export const callGetProfile = async ({ nextParams, id }: Params) => {
  try {
    const result: User = await httpFetchClient({
      method: 'GET',
      service: 'v1',
      path: `users/${id}`,
      nextParams,
    })

    return result
  } catch (err) {
    console.error(err)
    throw new Error('CallGetProfile failed')
  }
}
