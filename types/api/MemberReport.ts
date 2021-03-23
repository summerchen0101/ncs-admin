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
