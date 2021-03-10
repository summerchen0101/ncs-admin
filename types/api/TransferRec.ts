import { DateRangeListRequest, MemberBasic } from '..'

export interface TransferRec {
  amount: number
  created_at: number
  fee: number
  from_balance: number
  from_member: MemberBasic
  id: number
  status: number
  to_balance: number
  to_member: MemberBasic
  updated_at: number
}

export interface TransferRecListRequest extends DateRangeListRequest {
  from_acc?: string
  to_acc?: string
}

export interface TransferRecListResponse {
  list: TransferRec[]
  total_count: number
  total_page: number
}
