export interface Sport {
  id: number
  name: string
  code: string
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

export interface SportCreateRequest {
  name: string
  code: string
}
export interface SportEditRequest {
  id: number
  name: string
}
