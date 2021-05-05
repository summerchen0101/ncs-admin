import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface LeagueTranslate {
  id: number
  name: string
  fix_name: string
  is_active: boolean
  game_code: string

  editor: string
  created_at: number
  updated_at: number
}

export interface LeagueTranslateListRequest extends BaseListRequest {
  game_code: string
}

export interface LeagueTranslateListResponse {
  list: LeagueTranslate[]
  total_count: number
  total_page: number
}

export interface LeagueTranslateActiveRequest {
  id: number
  is_active: boolean
}

export interface LeagueTranslateCreateRequest {
  name: string
  fix_name: string
  is_active: boolean
  game_code: string
}
export interface LeagueTranslateEditRequest {
  id: number
  name: string
  fix_name: string
  is_active: boolean
}
