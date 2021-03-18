import { DateRangeListRequest } from '..'
export interface MemberReport {
  id: number
  name: string
  acc: string
  child_count: number
  member_count: number
  count: number
  amount: number
  valid_amount: number
  result: number
  rebate: number
  fee: number
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
