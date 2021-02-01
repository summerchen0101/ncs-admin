import { BlockStatus } from '@/lib/enums'

interface Permission {
  id: number
  name: string
  route: string
}

export interface AdminRole {
  id: number
  is_active: boolean
  name: string
  permissions: Permission[]
  created_at: number
  updated_at: number
}

export interface AdminRoleListRequest {
  page: number
  perpage: number
}

export interface AdminRoleListResponse {
  list: AdminRole[]
  total_count: number
  total_page: number
}

export interface AdminRoleActiveRequest {
  id: number
  is_active: boolean
}

export interface AdminRoleCreateRequest {
  name: string
  permission_ids: number[]
  is_active: boolean
}
export interface AdminRoleEditRequest {
  id: number
  name: string
  permission_ids: number[]
  is_active: boolean
}
