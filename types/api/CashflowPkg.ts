import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface CashflowPkg {
  id: number
  code: string
  name: string
  note: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface CashflowPkgListRequest extends BaseListRequest {
  name?: string
}

export interface CashflowPkgListResponse {
  list: CashflowPkg[]
  total_count: number
  total_page: number
}

export interface CashflowPkgActiveRequest {
  id: number
  is_active: boolean
}

export interface CashflowPkgCreateRequest {
  code: string
  name: string
  note: string
  is_active: boolean
}
export interface CashflowPkgEditRequest {
  id: number
  name: string
  note: string
  is_active: boolean
}
