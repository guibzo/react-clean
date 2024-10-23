import { env } from '@/infra/env'
import type { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { ServerCookiesAdapter } from '../cache/ServerCookiesAdapter'

type ServiceName = 'v1'
type Path = string
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type Body = BodyInit | null
type NextParams = RequestInit

type RequestType = {
  service: ServiceName
  path: Path
  method: Method
  nextParams?: NextParams
  body?: Body
}

export const httpFetchClient = async ({ service, path, method, body, nextParams }: RequestType) => {
  const cookies = new ServerCookiesAdapter()
  const accessToken = cookies.get('token')
  const baseURL = env.BASE_URL

  const url = new URL(`${service}/${path}`, baseURL)

  const headers: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: method !== 'GET' ? body : undefined,
    cache: method === 'GET' ? 'no-store' : 'default',
    ...nextParams,
  }

  const httpResponse = await fetch(url.toString(), fetchOptions)
  const result = await httpResponse.json()

  if (!httpResponse.ok) {
    return { error: result.error || 'UNKNOWN_ERROR', status: httpResponse.status }
  }

  return result
}

export type HttpFetchClientError = {
  error: string
  status: number
}
