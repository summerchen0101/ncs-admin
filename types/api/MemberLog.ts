import { DateRangeListRequest, MemberBasic } from '..'

export interface MemberLog {
  id: number
  created_at: number
  ip: string
  ip_location: string
  member: MemberBasic
  updated_at: number
}

export interface MemberLogListRequest extends DateRangeListRequest {
  acc?: string
  ip?: string
}

export interface MemberLogListResponse {
  list: MemberLog[]
  total_count: number
  total_page: number
}

export interface MemberLogRemoveAllRequest {
  start_at: number
  end_at: number
}
