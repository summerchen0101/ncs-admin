import { ProcessStatus, RewardProcess } from '@/lib/enums'
import { BaseListRequest, DateRangeListRequest, MemberBasic } from '..'
export interface AffiliateProfit {
  accounting_date: string
  amount: number
  confirm_status: ProcessStatus
  confirmed_at: number
  created_at: number
  editor: string
  fee_percent: number
  fee_profit: number
  id: number
  member: MemberBasic
  paid_at: number
  pay_status: RewardProcess
  updated_at: number
  child_count: number
}

export interface AffiliateProfitListRequest extends BaseListRequest {
  acc?: string
  parent_id?: number
  is_test?: number
  accounting_date?: string
}

export interface AffiliateProfitListResponse {
  list: AffiliateProfit[]
  total_count: number
  total_page: number
}
