import { Status } from '@/lib/enums'
export interface Member {
  id: number
  acc: string
  child_count: number
  created_at: number
  editor: string
  eth_addr: string
  is_active: boolean
  login_error_times: number
  login_ip: string
  logined_at: number
  name: string
  promo_code: string
  status: number
  team_count: number
  trx_addr: string
  updated_at: number
  balance: number
}

export interface MemberListRequest {
  agent_id?: number
  member_type?: number
  acc?: string
  is_active: Status
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

export interface MemberCreateRequest {
  name: string
  acc: string
  pass: string
  sec_pass: string
  is_active: boolean
}
export interface MemberEditRequest {
  id: number
  name: string
  acc: string
  pass: string
  sec_pass: string
  is_active: boolean
}
