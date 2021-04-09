import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface CashflowGroup {
  id: number
  code: string
  name: string
  note: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface CashflowGroupListRequest extends BaseListRequest {
  name?: string
}

export interface CashflowGroupListResponse {
  list: CashflowGroup[]
  total_count: number
  total_page: number
}

export interface CashflowGroupActiveRequest {
  id: number
  is_active: boolean
}

export interface CashflowGroupCreateRequest {
  code: string
  name: string
  note: string
  is_active: boolean
}
export interface CashflowGroupEditRequest {
  id: number
  name: string
  note: string
  is_active: boolean
}
