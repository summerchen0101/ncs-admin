import { Status } from '@/lib/enums'
export interface Odds {
  id: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  away_percent: number
  away_point: number
  bet_amount_limit: number
  created_at: number
  editor: string
  fix_odds: number
  game_code: string
  home_percent: number
  home_point: number
  is_active: true
  is_auto_odds: false
  is_open_bet: true
  odds: number
  play_code: string
  section_code: string
  single_bet_least: number
  single_bet_limit: number
  updated_at: number
  handicap_id: number
}

export interface OddsListRequest {
  game_code: string
  section_code: string
  play_code: string
  handicap_id?: number
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
  single_bet_least: number
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
  single_bet_least: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
}
