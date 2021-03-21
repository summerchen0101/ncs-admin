import { BaseListRequest } from '..'
export interface AffiliateLevel {
  id: number
  level: number
  name: string
  active_member_count: number
  profit_min: number
  profit_max: number
  profit_percent: number
  is_active: boolean

  editor: string
  created_at: number
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
  profit_min: number
  profit_max: number
  profit_percent: number
  is_active: boolean
}
export interface AffiliateLevelEditRequest {
  id: number
  level: number
  name: string
  active_member_count: number
  profit_min: number
  profit_max: number
  profit_percent: number
  is_active: boolean
}
