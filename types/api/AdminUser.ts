import { BlockStatus } from '@/lib/enums'
import { Status } from '@chakra-ui/react'

interface Role {
  id: number
  name: string
}
interface Permission {
  id: number
  name: string
  route: string
}

export interface AdminUser {
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

export interface AdminUserListRequest {
  acc?: string
  role_id?: number
  is_active?: Status
  status?: BlockStatus
  page: number
  perpage: number
}

export interface AdminUserListResponse {
  list: AdminUser[]
  total_count: number
  total_page: number
}

export interface AdminUserStatusRequest {
  id: number
  status: BlockStatus
}
export interface AdminUserActiveRequest {
  id: number
  is_active: boolean
}

export interface AdminUserCreateRequest {
  acc: string
  pass: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
export interface AdminUserEditRequest {
  id: number
  acc: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
