import { DateRangeListRequest } from '..'
import { SportGame } from './SportGame'

export interface DailyReport {
  id: number
  name: string
  acc: string
  count: number
  amount: number
  valid_amount: number
  result: number
  rebate: number
  fee: number
  agent_result: number
  agent_rebate: number
  agent_fee: number
  agent_share_rebate: number
}

export interface DailyReportListRequest extends DateRangeListRequest {
  acc?: string
  game_code?: SportGame
}

export interface DailyReportListResponse {
  list: DailyReport[]
  total_count: number
  total_page: number
}
