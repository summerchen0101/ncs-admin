import { Status } from '@/lib/enums'

export interface League {
  id: number
  name: string
  bet365_code: string
  note: string
  game: {
    code: string
    country_id: number
    sport_id: number
    id: number
    name: string
  }
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface LeagueListRequest {
  game_id: number
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
  bet365_code: string
  note: string
  game_id: number
  is_active: boolean
}
export interface LeagueEditRequest {
  id: number
  name: string
  bet365_code: string
  note: string
  game_id: number
  is_active: boolean
}
