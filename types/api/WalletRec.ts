import { WalletRecType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'

export interface WalletRec {
  amount: number
  balance: number
  created_at: number
  id: number
  member: MemberBasic
  note: string
  updated_at: number
  wallet_rec_type: number
}

export interface WalletRecListRequest extends DateRangeListRequest {
  acc?: string
  wallet_rec_type?: WalletRecType
}

export interface WalletRecSummary {
  wallet_rec_type: WalletRecType
  count: number
  amount: number
}

export interface WalletRecListResponse {
  list: WalletRec[]
  summary: WalletRecSummary[]
  total_count: number
  total_page: number
}
