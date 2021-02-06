import { OptionBasic } from '.'

export interface PermissionOption {
  id: number
  name: string
  route: string
}

export interface OptionsResponseBasic<T> {
  list: T[]
}

export interface OptionBasicWithCode extends OptionBasic {
  code: string
}

export type RoleOption = OptionBasic
