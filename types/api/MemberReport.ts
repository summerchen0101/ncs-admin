import { DateRangeListRequest } from '..'
export interface MemberReport {
  id: number
  name: string
  acc: string
  result: number
  rebate: number
  fee: number

  child_count: number
  member_count: number
  week_valid_member_count: number
  mon_valid_member_count: number
  valid_member_count: number
  bet_count: number
  bet_sum: number
  valid_bet_sum: number
  deposit_sum: number
  fee_percent: number
  valid_agent_count: number

  week_valid_agent_count: number
  mon_valid_agent_count: number
  self_bet_count: number
  self_bet_sum: number
  self_valid_bet_sum: number
  self_result: number
  self_rebate: number
  self_fee: number
  self_deposit_sum: number

  promo_level: number
}

export interface MemberReportListRequest extends DateRangeListRequest {
  acc?: string
  parent_id?: number
  is_test?: number
}

export interface MemberReportListResponse {
  list: MemberReport[]
  total_count: number
  total_page: number
}
