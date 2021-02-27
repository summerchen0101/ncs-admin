import { BaseListRequest, MemberBasic } from '..'

export interface BetRatio {
  id: number
  member: MemberBasic
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
