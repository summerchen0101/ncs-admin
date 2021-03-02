import { BaseListRequest, MemberBasic } from '..'

export interface BetRatio {
  id: number
  accounting_status: number
  agent: MemberBasic
  created_at: number
  fee: number
  fee_percent: number
  rebate: number
  rebate_percent: number
  result: number
  risk_percent: number
  updated_at: number
}

export interface BetRatioListRequest extends BaseListRequest {
  bet_rec_id: number
  page?: number
  perpage?: number
}

export interface BetRatioListResponse {
  list: BetRatio[]
  total_count: number
  total_page: number
}
