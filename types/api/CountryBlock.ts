import { PlatformType, Status } from '@/lib/enums'

export interface CountryBlock {
  id: number
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string

  editor: string
  created_at: number
  updated_at: number
}

export interface CountryBlockListRequest {
  is_active?: Status
  page?: number
  perpage?: number
}

export interface CountryBlockListResponse {
  list: CountryBlock[]
  total_count: number
  total_page: number
}

export interface CountryBlockActiveRequest {
  id: number
  is_active: boolean
}

export interface CountryBlockCreateRequest {
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string
}
export interface CountryBlockEditRequest {
  id: number
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string
}
