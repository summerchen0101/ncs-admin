import { Status } from '@/lib/enums'

export interface SportGame {
  id: number
  name: string
  code: string
  note: string
  country: {
    code: string
    id: number
    name: string
  }
  sport: {
    code: string
    country_code: number
    id: number
    name: string
  }
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface SportGameListRequest {
  country_code?: string
  sport_code?: string
  is_active?: Status
  page?: number
  perpage?: number
}

export interface SportGameListResponse {
  list: SportGame[]
  total_count: number
  total_page: number
}

export interface SportGameActiveRequest {
  id: number
  is_active: boolean
}

export interface SportGameCreateRequest {
  name: string
  code: string
  country_code: string
  sport_code: string
  is_active: boolean
}
export interface SportGameEditRequest {
  id: number
  name: string
  is_active: boolean
}
