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

export interface GameOptionsResponse {
  code: string
  country_code: string
  id: number
  name: string
  sport_code: string
}
export interface LeagueOptionsResponse {
  game_code: string
  group_code: string
  id: number
  name: string
}

export type RoleOption = OptionBasic
