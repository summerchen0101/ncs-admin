import { DateRangeListRequest, MemberBasic } from '..'
import { Handicap } from './Handicap'
export interface BetRecord {
  accounting_status: number
  amount: number
  away_percent: number
  away_point: number
  bet_type: string
  created_at: number
  fee: number
  game_code: string
  member: MemberBasic
  handicap: Handicap
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
  handicap_id?: number
  sns?: string[]
  home_point?: number
  away_point?: number
}

export interface BetRecordSummary {
  amount: number
  count: number
  fee: number
  rebate: number
  result: number
  valid_amount: number
}

export interface BetRecordListResponse {
  list: BetRecord[]
  summary: BetRecordSummary
  total_count: number
  total_page: number
}
