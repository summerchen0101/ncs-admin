import { MemberBasic } from '..'
export interface RealName {
  confirmed_at: number
  created_at: number
  editor: string
  id: number
  id_card_num: string
  id_card_img?: string
  is_confirm: boolean
  member: MemberBasic
  name: string
  updated_at: number
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
