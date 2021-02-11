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

export interface GameOption {
  code: string
  country_code: string
  id: number
  name: string
  sport_code: string
}
export interface LeagueOption {
  game_code: string
  group_code: string
  id: number
  name: string
}

export interface MenuOption {
  icon: string
  id: number
  name: string
  parent_id: number
  path: string
  sort: number
}

export type RoleOption = OptionBasic
