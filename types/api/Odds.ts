import { Status } from '@/lib/enums'
export interface Odds {
  id: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number

  editor: string
  created_at: number
  updated_at: number
}

export interface OddsListRequest {
  game_code: string
  section_code: string
  play_code: string
  handicap_id: number
  page?: number
  perpage?: number
}

export interface OddsListResponse {
  list: Odds[]
  total_count: number
  total_page: number
}

export interface OddsActiveRequest {
  id: number
  is_active: boolean
}

export interface OddsCreateRequest {
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  odds: number
  bet_amount_limit: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
  game_code: string
  section_code: string
  play_code: string
  handicap_id: number
}
export interface OddsEditRequest {
  id: number
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  odds: number
  bet_amount_limit: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
}
