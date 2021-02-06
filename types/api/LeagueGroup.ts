import { Status } from '@/lib/enums'

export interface LeagueGroup {
  code: string
  created_at: number
  game_code: string
  id: number
  is_active: true
  name: string
  note: string
  updated_at: number
}

export interface LeagueGroupListRequest {
  game_code?: string
  is_active?: Status
  page?: number
  perpage?: number
}

export interface LeagueGroupListResponse {
  list: LeagueGroup[]
  total_count: number
  total_page: number
}

export interface LeagueGroupActiveRequest {
  id: number
  is_active: boolean
}

export interface LeagueGroupCreateRequest {
  name: string
  code: string
  game_code: string
  is_active: boolean
}
export interface LeagueGroupEditRequest {
  id: number
  name: string
  is_active: boolean
}
