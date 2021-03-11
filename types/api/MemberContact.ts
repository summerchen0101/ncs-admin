import { MemberBasic } from '..'
export interface MemberContact {
  confirmed_at: number
  created_at: number
  editor: string
  email: string
  id: number
  is_confirm: false
  line_id: string
  member: MemberBasic
  mobile: string
  qq_id: string
  telegram_id: string
  updated_at: number
  wechat_id: string
}

export interface MemberContactListRequest {
  acc?: string
  mobile?: string
  email?: string
  line_id?: string
  wechat_id?: string
  qq_id?: string
  telegram_id?: string
  page?: number
  perpage?: number
}

export interface MemberContactListResponse {
  list: MemberContact[]
  total_count: number
  total_page: number
}

export interface MemberContactActiveRequest {
  id: number
  is_active: boolean
}
