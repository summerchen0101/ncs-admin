import { DateRangeListRequest } from '..'
export interface BetRecord {
  accounting_status: number
  amount: number
  away_percent: number
  away_point: number
  bet_type: string
  created_at: number
  fee: number
  game_code: string
  handicap: {
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
    is_active: true
    is_auto_accounting: false
    is_open_bet: true
    play_at: number
    team_away: {
      id: number
      league_id: number
      league_name: string
      name: string
      name_en: string
    }
    team_home: {
      id: number
      league_id: number
      league_name: string
      name: string
      name_en: string
    }
    updated_at: number
  }
  home_percent: number
  home_point: number
  id: number
  odds: number
  rebate: number
  rebate_percent: number
  result: number
  section_code: string
  sn: string
  valid_amount: number
}

export interface BetRecordListRequest extends DateRangeListRequest {
  acc?: string
  accounting_status?: number
  sns?: string[]
}

export interface BetRecordListResponse {
  list: BetRecord[]
  total_count: number
  total_page: number
}
