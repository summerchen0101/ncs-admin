import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface TeamTranslate {
  id: number
  name: string
  fix_name: string
  is_active: boolean
  league: {
    game_code: string
    id: number
    name: string
  }

  editor: string
  created_at: number
  updated_at: number
}

export interface TeamTranslateListRequest extends BaseListRequest {
  league_id: number
}

export interface TeamTranslateListResponse {
  list: TeamTranslate[]
  total_count: number
  total_page: number
}

export interface TeamTranslateActiveRequest {
  id: number
  is_active: boolean
}

export interface TeamTranslateCreateRequest {
  name: string
  fix_name: string
  is_active: boolean
  league_id: number
}
export interface TeamTranslateEditRequest {
  id: number
  name: string
  fix_name: string
  is_active: boolean
}
