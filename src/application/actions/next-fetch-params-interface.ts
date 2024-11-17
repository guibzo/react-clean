import type { RequestInit } from 'next/dist/server/web/spec-extension/request'

export interface NextFetchParamsInterface
  extends Partial<{
    nextParams?: RequestInit
  }> {}
