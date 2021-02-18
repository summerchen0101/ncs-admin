import { PlatformType, Status } from '@/lib/enums'

export interface GameReport {
  id: number
}

export interface GameReportListRequest {
  page?: number
  perpage?: number
}

export interface GameReportListResponse {
  list: GameReport[]
  total_count: number
  total_page: number
}
