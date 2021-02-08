export interface Handicap {
  accounting_at: number
  accounting_status: number
  away_half_score: number
  away_score: number
  bet_count: number
  bet_sum: number
  created_at: number
  editor: string
  fix_away_half_score: number
  fix_away_score: number
  fix_home_half_score: number
  fix_home_score: number
  game_code: string
  game_status: number
  half_bet_count: number
  half_bet_sum: number
  home_half_score: number
  home_score: number
  id: number
  is_active: boolean
  is_auto_accounting: boolean
  is_open_bet: boolean
  league: {
    game_code: string
    group_code: string
    id: number
    name: string
  }
  play_at: number
  team_away: {
    id: number
    league_id: number
    name: string
    name_en: string
  }
  team_home: {
    id: number
    league_id: number
    name: string
    name_en: string
  }
  updated_at: number
}

export interface HandicapListRequest {
  start_at?: number
  end_at?: number
  game_code?: string
  page?: number
  perpage?: number
}

export interface HandicapListResponse {
  list: Handicap[]
  total_count: number
  total_page: number
}

export interface HandicapActiveRequest {
  id: number
  is_active: boolean
}
