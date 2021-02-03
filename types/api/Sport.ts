export interface Sport {
  id: number
  name: string
  code: string
  note: string
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface SportListRequest {
  page?: number
  perpage?: number
}

export interface SportListResponse {
  list: Sport[]
  total_count: number
  total_page: number
}

export interface SportActiveRequest {
  id: number
  is_active: boolean
}

export interface SportCreateRequest {
  name: string
  code: string
  note: string
  is_active: boolean
}
export interface SportEditRequest {
  id: number
  name: string
  code: string
  note: string
  is_active: boolean
}
