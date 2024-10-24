import type { INextFetchParams } from '@/core/actions/INextFetchParams'

export interface IGetProfileRequest extends INextFetchParams {
  id: string
}
