import { BaseListRequest } from '..'
export interface AffiliateLevel {
  active_agent_count: number
  active_member_count: number
  created_at: number
  id: number
  is_active: boolean
  level: number
  name: string
  result_min: number
  result_percent: number
  fee_min: number
  fee_percent: number
  updated_at: number
}

export interface AffiliateLevelListRequest extends BaseListRequest {}

export interface AffiliateLevelListResponse {
  list: AffiliateLevel[]
  total_count: number
  total_page: number
}

export interface AffiliateLevelActiveRequest {
  id: number
  is_active: boolean
}

export interface AffiliateLevelCreateRequest {
  level: number
  name: string
  active_member_count: number
  active_agent_count: number
  result_min: number
  result_percent: number
  fee_min: number
  fee_percent: number
  is_active: boolean
}
export interface AffiliateLevelEditRequest {
  id: number
  level: number
  name: string
  active_member_count: number
  active_agent_count: number
  result_min: number
  result_percent: number
  fee_min: number
  fee_percent: number
  is_active: boolean
}
