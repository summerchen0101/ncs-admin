import { Status } from '@/lib/enums'
export interface Handicap {
  id: number
  is_active: boolean
  start_at: number
  end_at: number

  editor: string
  created_at: number
  updated_at: number
}

export interface HandicapListRequest {
  start_at?: number
  end_at?: number
  is_active?: Status
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
