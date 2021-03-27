import { DateRangeListRequest } from '..'
import { SportGame } from './SportGame'

export interface ProfitReport {
  date: string
  game_code: string
  count: number
  amount: number
  valid_amount: number
  result: number
  rebate: number
  fee: number
}

export interface ProfitReportListRequest extends DateRangeListRequest {
  game_codes?: string[]
  is_test?: number
}

export interface ProfitReportListResponse {
  list: ProfitReport[]
  total_count: number
  total_page: number
}
