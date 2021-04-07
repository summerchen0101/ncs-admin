import { PaymentType, ProcessStatus } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
export interface DepositRec {
  accounting_at: number
  amount: number
  balance: number
  created_at: number
  fee: number
  id: number
  is_first: false
  member: MemberBasic
  merchant_sn: string
  note: string
  payment_fee: number
  payment_type: PaymentType
  sn: string
  status: number
  updated_at: number
}

export interface DepositRecListRequest extends DateRangeListRequest {
  sn?: string
  merchant_sn?: string
  acc?: string
  is_first?: number
  merchant_id?: string
  status?: ProcessStatus
}

export interface DepositRecListResponse {
  list: DepositRec[]
  total_count: number
  total_page: number
}
