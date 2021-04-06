import { PaymentType } from '@/lib/enums'
import { DateRangeListRequest } from '..'
export interface DepositRec {
  accounting_at: number
  amount: number
  balance: number
  created_at: number
  id: number
  payment_type: PaymentType
  sn: string
  status: number
  updated_at: number
}

export interface DepositRecListRequest extends DateRangeListRequest {
  acc?: string
}

export interface DepositRecListResponse {
  list: DepositRec[]
  total_count: number
  total_page: number
}
