import { OptionBasic } from '..'

export interface PermissionOption {
  id: number
  name: string
  route: string
}

export interface PermissionOptionResponse {
  list: PermissionOption[]
}

export type RoleOption = OptionBasic
