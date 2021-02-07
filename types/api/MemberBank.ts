import { MemberBasic } from '..'
export interface MemberBank {
  id: number
  acc: string
  branch: string
  confirmed_at: number
  created_at: number
  img: string
  is_confirm: boolean
  is_default: boolean
  name: string
  person: string
  updated_at: number
  editor: string
  member: MemberBasic
}

export interface MemberBankListRequest {
  acc?: string
  is_confirm?: number
  page?: number
  perpage?: number
}

export interface MemberBankListResponse {
  list: MemberBank[]
  total_count: number
  total_page: number
}

export interface MemberBankActiveRequest {
  id: number
  is_active: boolean
}
