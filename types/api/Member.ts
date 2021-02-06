import { AccountingType, BlockStatus, MemberType, Status } from '@/lib/enums'
export interface Member {
  id: number
  acc: string
  balance: number
  created_at: number
  editor: string
  is_active: true
  is_open_bet: true
  login_error_times: number
  login_ip: string
  logined_at: number
  member_count: number
  name: string
  status: number
  updated_at: number
}

export interface MemberListRequest {
  agent_id?: number
  member_type?: MemberType
  acc?: string
  is_active?: Status
  page?: number
  perpage?: number
}

export interface MemberListResponse {
  list: Member[]
  total_count: number
  total_page: number
}

export interface MemberActiveRequest {
  id: number
  is_active: boolean
}
export interface MemberStatusRequest {
  id: number
  status: BlockStatus
}

export interface MemberCreateRequest {
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  parent_id: number
  is_active: boolean
}
export interface MemberEditRequest {
  id: number
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  parent_id: number
  is_active: boolean
}
