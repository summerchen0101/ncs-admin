import { MemberBasic } from '..'
export interface RealName {
  confirmed_at: number
  created_at: number
  editor: string
  email: string
  id: number
  id_card_num: string
  id_card_img?: string
  is_confirm: false
  line_id: string
  member: MemberBasic
  mobile: string
  name: string
  qq_id: string
  telegram_id: string
  updated_at: number
  wechat_id: string
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
