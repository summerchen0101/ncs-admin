import { Status } from '@/lib/enums'

export interface League {
  created_at: number
  game_code: string
  group_code: string
  id: number
  is_active: true
  name: string
  note: string
  updated_at: number
}

export interface LeagueListRequest {
  game_code?: string
  group_code?: string
  is_active?: Status
  page?: number
  perpage?: number
}

export interface LeagueListResponse {
  list: League[]
  total_count: number
  total_page: number
}

export interface LeagueActiveRequest {
  id: number
  is_active: boolean
}

export interface LeagueCreateRequest {
  name: string
  game_code: string
  group_code: string
  is_active: boolean
  note: string
}
export interface LeagueEditRequest {
  id: number
  name: string
  group_code: string
  is_active: boolean
  note: string
}
