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
  created_at: number
  id: number
  sn: string
  status: number
  updated_at: number
  member: MemberBasic
}

export interface WithdrawRecListRequest extends DateRangeListRequest {
  sn?: String
  acc?: String
  status?: ProcessStatus
}

export interface WithdrawRecListResponse {
  list: WithdrawRec[]
  total_count: number
  total_page: number
}
