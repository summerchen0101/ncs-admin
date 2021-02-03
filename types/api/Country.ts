export interface Country {
  id: number
  name: string
  code: string
  note: string
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface CountryListRequest {
  page?: number
  perpage?: number
}

export interface CountryListResponse {
  list: Country[]
  total_count: number
  total_page: number
}

export interface CountryActiveRequest {
  id: number
  is_active: boolean
}

export interface CountryCreateRequest {
  name: string
  code: string
  note: string
  is_active: boolean
}
export interface CountryEditRequest {
  id: number
  name: string
  code: string
  note: string
  is_active: boolean
}
