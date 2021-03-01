import { ProcessStatus, RechargeType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
export interface RechargeRec {
  id: number
  amount: number
  note: string
  recharge_type: RechargeType
  balance: number
  member: MemberBasic
  status: ProcessStatus

  editor: string
  created_at: number
  updated_at: number
}

export interface RechargeRecListRequest extends DateRangeListRequest {
  acc?: string
  recharge_type?: RechargeType
}

export interface RechargeRecListResponse {
  list: RechargeRec[]
  total_count: number
  total_page: number
}

export interface RechargeRecCreateRequest {
  acc: string
  amount: number
  note: string
  recharge_type: RechargeType
}