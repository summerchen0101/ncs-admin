import { BlockStatus, Status } from '@/lib/enums'

export interface MemberShadow {
  id: number
  acc: string
  pass: string
  name: string
  note: string
  is_active: boolean
  status: BlockStatus

  login_ip: string
  logined_at: number
  created_at: number
  updated_at: number
}

export interface SubAccListRequest {
  acc?: string
  is_active?: Status
  page?: number
  perpage?: number
}

export interface SubAccListResponse {
  list: MemberShadow[]
  total_count: number
  total_page: number
}

export interface SubAccActiveRequest {
  id: number
  is_active: boolean
}

export interface SubAccStatusRequest {
  id: number
  status: BlockStatus
}

export interface SubAccCreateRequest {
  acc: string
  pass: string
  name: string
  note: string
  is_active: boolean
}
export interface SubAccEditRequest {
  id: number
  name: string
  note: string
}
