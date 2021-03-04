import { BlockStatus, Status } from '@/lib/enums'

interface Role {
  id: number
  name: string
}
interface Permission {
  id: number
  name: string
  route: string
}

export interface SubAcc {
  id: number
  acc: string
  pass: string
  name: string
  roles: Role[]
  permissions: Permission[]
  is_active: boolean
  status: BlockStatus

  login_ip: string
  logined_at: number
  created_at: number
  updated_at: number
}

export interface SubAccListRequest {
  acc?: string
  role_id?: number
  is_active?: Status
  status?: BlockStatus
  page?: number
  perpage?: number
}

export interface SubAccListResponse {
  list: SubAcc[]
  total_count: number
  total_page: number
}

export interface SubAccStatusRequest {
  id: number
  status: BlockStatus
}
export interface SubAccActiveRequest {
  id: number
  is_active: boolean
}

export interface SubAccCreateRequest {
  acc: string
  pass: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
export interface SubAccEditRequest {
  id: number
  acc: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
