import { DateRangeListRequest } from '..'
export interface RechargeRec {
  id: number
  acc: string
  amount: number

  editor: string
  created_at: number
  updated_at: number
}

export interface RechargeRecListRequest extends DateRangeListRequest {
  acc?: string
}

export interface RechargeRecListResponse {
  list: RechargeRec[]
  total_count: number
  total_page: number
}

export interface RechargeRecCreateRequest {
  acc: string
  amount: number
}
