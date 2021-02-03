import { Status } from '@/lib/enums'

export interface Team {
  id: number
  name: string
  name_en: string
  note: string
  league: {
    game_id: number
    id: number
    name: string
  }
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface TeamListRequest {
  league_id?: number
  is_active?: Status
  page?: number
  perpage?: number
}

export interface TeamListResponse {
  list: Team[]
  total_count: number
  total_page: number
}

export interface TeamActiveRequest {
  id: number
  is_active: boolean
}

export interface TeamCreateRequest {
  name: string
  note: string
  league_id: number
  is_active: boolean
}
export interface TeamEditRequest {
  id: number
  name: string
  note: string
  league_id: number
  is_active: boolean
}
