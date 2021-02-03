import { IPBlockType, PlatformType, Status } from '@/lib/enums'

export interface IpBlock {
  id: number

  ip_block_type: IPBlockType
  platform_type: PlatformType
  ip: string
  note: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface IpBlockListRequest {
  ip?: string
  block_type?: IPBlockType
  is_active?: Status
  page?: number
  perpage?: number
}

export interface IpBlockListResponse {
  list: IpBlock[]
  total_count: number
  total_page: number
}

export interface IpBlockActiveRequest {
  id: number
  is_active: boolean
}

export interface IpBlockCreateRequest {
  block_type: IPBlockType
  platform_type: PlatformType
  ip: string
  note: string
  is_active: boolean
}
export interface IpBlockEditRequest {
  id: number
  block_type: IPBlockType
  platform_type: PlatformType
  ip: string
  note: string
  is_active: boolean
}
