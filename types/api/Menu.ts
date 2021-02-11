import { Status } from '@/lib/enums'
import { BaseListRequest, OptionBasic } from '..'
import { PermissionOption } from '../options'

export interface Menu {
  children?: Menu[]
  id: number
  icon: string
  name: string
  parent_id?: number
  path: string
  permissions: PermissionOption[]
  roles: OptionBasic[]
  sort: number
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface MenuListRequest extends BaseListRequest {}

export interface MenuListResponse {
  list: Menu[]
  total_count: number
  total_page: number
}

export interface MenuActiveRequest {
  id: number
  is_active: boolean
}

export interface MenuCreateRequest {
  icon: string
  name: string
  parent_id?: number
  path: string
  permission_ids: number[]
  role_ids: number[]
  sort: number
  is_active: boolean
}
export interface MenuEditRequest {
  id: number
  icon: string
  name: string
  parent_id?: number
  path: string
  permission_ids: number[]
  role_ids: number[]
  sort: number
  is_active: boolean
}
