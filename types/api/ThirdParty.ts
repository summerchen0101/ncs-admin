import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface ThirdParty {
  id: number
  code: string
  name: string
  note: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface ThirdPartyListRequest extends BaseListRequest {
  name?: string
}

export interface ThirdPartyListResponse {
  list: ThirdParty[]
  total_count: number
  total_page: number
}

export interface ThirdPartyActiveRequest {
  id: number
  is_active: boolean
}

export interface ThirdPartyCreateRequest {
  code: string
  name: string
  note: string
  is_active: boolean
}
export interface ThirdPartyEditRequest {
  id: number
  name: string
  note: string
  is_active: boolean
}
