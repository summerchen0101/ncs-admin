import { MemberBasic } from '..'
export interface RealName {
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

export interface RealNameListRequest {
  acc?: string
  is_confirm?: number
  page?: number
  perpage?: number
}

export interface RealNameListResponse {
  list: RealName[]
  total_count: number
  total_page: number
}

export interface RealNameActiveRequest {
  id: number
  is_active: boolean
}
