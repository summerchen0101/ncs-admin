import { PlatformType, Status } from '@/lib/enums'

export interface CountryIpBlock {
  id: number
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string

  editor: string
  created_at: number
  updated_at: number
}

export interface CountryIpBlockListRequest {
  is_active?: Status
  page?: number
  perpage?: number
}

export interface CountryIpBlockListResponse {
  list: CountryIpBlock[]
  total_count: number
  total_page: number
}

export interface CountryIpBlockActiveRequest {
  id: number
  is_active: boolean
}

export interface CountryIpBlockCreateRequest {
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string
}
export interface CountryIpBlockEditRequest {
  id: number
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string
}
