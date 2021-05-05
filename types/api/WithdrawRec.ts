import { ProcessStatus } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'

export interface WithdrawRec {
  accounting_at: number
  amount: number
  balance: number
  bank_acc: string
  bank_branch: string
  bank_name: string
  bank_person: string
  confirm_status: number
  confirmed_at: number
  created_at: number
  editor: string
  fee: number
  id: number
  is_first: false
  merchant: {
    id: string
    name: string
  }
  merchant_sn: string
  note: string
  payment_fee: number
  sn: string
  status: number
  updated_at: number
  member: MemberBasic
}

export interface WithdrawRecListRequest extends DateRangeListRequest {
  sn?: string
  merchant_sn?: string
  acc?: string
  is_first?: number
  merchant_id?: string
  status?: ProcessStatus
}

export interface WithdrawRecSummary {
  count: number
  amount: number
}

export interface WithdrawRecListResponse {
  list: WithdrawRec[]
  summary: WithdrawRecSummary
  total_count: number
  total_page: number
}
export interface WithdrawReviewRequest {
  id: number
  merchant_id: number
  status: ProcessStatus
}
