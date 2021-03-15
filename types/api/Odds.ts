import { AutoOddsType } from '@/lib/enums'

export interface Odds {
  id: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  away_percent: number
  away_point: number
  single_game_limit: number
  single_side_limit: number
  created_at: number
  editor: string
  game_code: string
  home_percent: number
  home_point: number
  is_active: true
  is_auto_odds: false
  is_open_bet: true
  play_code: string
  section_code: string
  single_bet_least: number
  single_bet_limit: number
  updated_at: number

  auto_odds_type: number
  away_auto_odds: number
  away_fix_odds: number
  away_odds: number
  home_auto_odds: number
  home_fix_odds: number
  home_odds: number
}

export interface OddsListRequest {
  game_code: string
  section_code: string
  play_code: string
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
  single_game_limit: number
  single_side_limit: number
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
  home_odds: number
  away_odds: number
  auto_odds_type: AutoOddsType
}
export interface OddsEditRequest {
  id: number
  home_point: number
  away_point: number
  home_percent: number
  away_percent: number
  single_game_limit: number
  single_side_limit: number
  single_bet_least: number
  single_bet_limit: number
  auto_odds_amount_unit: number
  auto_odds_rate_unit: number
  is_open_bet: boolean
  is_auto_odds: boolean
  is_active: boolean
  home_odds: number
  away_odds: number
  auto_odds_type: AutoOddsType
}
