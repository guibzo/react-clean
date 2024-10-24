import type { RequestInit } from 'next/dist/server/web/spec-extension/request'

export interface INextFetchParams
  extends Partial<{
    nextParams: RequestInit
  }> {}
