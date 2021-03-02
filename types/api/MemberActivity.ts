import { DateRangeListRequest } from '..'
export interface MemberActivity {
  id: number
  name: string
  acc: string
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

export interface MemberActivityListRequest extends DateRangeListRequest {
  acc?: string
  agent_id?: number
}

export interface MemberActivityListResponse {
  list: MemberActivity[]
  total_count: number
  total_page: number
}
