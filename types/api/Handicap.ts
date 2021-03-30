import {
  AccountingStatus,
  GameStatus,
  ProcessStatus,
  Section,
} from '@/lib/enums'
import { SportGame } from './SportGame'

export interface TeamInfo {
  id: number
  league_id: number
  league_name: string
  name: string
  name_en: string
}

export interface Handicap {
  accounting_at: number
  accounting_status: number
  half_accounting_status: number
  away_half_score: number
  away_score: number
  bet_count: number
  bet_sum: number
  created_at: number
  editor: string
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
  play_at: number
  team_away: TeamInfo
  team_home: TeamInfo
  updated_at: number
}

export interface HandicapListRequest {
  start_at?: number
  end_at?: number
  game_code?: string
  game_status?: GameStatus
  accounting_status?: AccountingStatus
  half_accounting_status?: AccountingStatus
  sorts?: string[]
  page?: number
  perpage?: number
}

export interface HandicapListResponse {
  list: Handicap[]
  total_count: number
  total_page: number
}

export interface HandicapCreateRequest {
  game_status: GameStatus
  half_game_status: GameStatus
  is_open_bet: boolean
  is_active: boolean
  is_auto_accounting: boolean
  play_at: number
  accounting_at: number
  team_home_id: number
  team_away_id: number
  game_code: SportGame
}

export interface HandicapActiveRequest {
  id: number
  is_active: boolean
}

export interface HandicapResultRequest {
  id: number
  section_code: Section
  home_score: number
  away_score: number
  accounting_status: AccountingStatus
}
