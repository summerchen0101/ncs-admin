import { DateRangeListRequest } from '..'
import { SportGame } from './SportGame'

export interface DailyReport {
  // id?: number
  date: string
  count: number
  amount: number
  not_accounting_amount: number
  fee: number
  share_rebate: number
  rebate: number
  result: number
  sys_result: number
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
