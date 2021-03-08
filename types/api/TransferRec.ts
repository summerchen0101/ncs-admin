import { DateRangeListRequest, MemberBasic } from '..'

export interface TransferRec {
  amount: number
  created_at: number
  id: number
  member: MemberBasic
  note: string
  updated_at: number
  wallet_rec_type: number
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
