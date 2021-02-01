import { BlockStatus } from '@/lib/enums'

interface Role {
  id: number
  name: string
}
interface Permission {
  id: number
  name: string
  route: string
}

export interface AdminRole {
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

export interface AdminRoleListRequest {
  acc?: string
  role_id?: number
  is_active?: boolean
  status?: BlockStatus
  page: number
  perpage: number
}

export interface AdminRoleListResponse {
  list: AdminRole[]
  total_count: number
  total_page: number
}

export interface AdminRoleStatusRequest {
  id: number
  status: BlockStatus
}
export interface AdminRoleActiveRequest {
  id: number
  is_active: boolean
}

export interface AdminRoleCreateRequest {
  acc: string
  pass: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
export interface AdminRoleEditRequest {
  id: number
  acc: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  status: BlockStatus
}
