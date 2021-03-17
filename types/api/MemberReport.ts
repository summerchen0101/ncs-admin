import { DateRangeListRequest } from '..'
export interface MemberReport {
  id: number
  name: string
  acc: string
  agent_count: number
  deposit_count: number
  first_deposit_count: number
  not_first_deposit_count: number
  withdraw_count: number
  first_withdraw_count: number
  not_first_withdraw_count: number
  deposit_sum: number
  first_deposit_sum: number
  not_first_deposit_sum: number
  withdraw_sum: number
  first_withdraw_sum: number
  not_first_withdraw_sum: number
  login_count: number
  register_count: number
}

export interface MemberReportListRequest extends DateRangeListRequest {
  acc?: string
  parent_id?: number
}

export interface MemberReportListResponse {
  list: MemberReport[]
  total_count: number
  total_page: number
}
