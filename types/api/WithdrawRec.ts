import { ProcessStatus } from '@/lib/enums'
import { MemberBasic } from '..'

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

export interface WithdrawRecListRequest {
  title?: string
  // start_at?: number
  // end_at?: number
  status?: ProcessStatus
  page?: number
  perpage?: number
}

export interface WithdrawRecListResponse {
  list: WithdrawRec[]
  total_count: number
  total_page: number
}
