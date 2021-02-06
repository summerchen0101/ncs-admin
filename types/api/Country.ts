export interface Country {
  id: number
  name: string
  code: string
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

export interface CountryCreateRequest {
  name: string
  code: string
}
export interface CountryEditRequest {
  id: number
  name: string
}
