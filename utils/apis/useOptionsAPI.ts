import { OptionBasic } from '@/types'
import {
  GameOption,
  LeagueOption,
  MenuOption,
  OptionBasicWithCode,
  OptionsResponseBasic,
  PermissionOption,
} from '@/types/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { get, post } = useRequest()

  return {
    menus: () => get<OptionsResponseBasic<MenuOption>>('admin_menu/options'),
    permissions: () =>
      get<OptionsResponseBasic<PermissionOption>>('admin_permission/options'),
    roles: () => get<OptionsResponseBasic<OptionBasic>>('admin_role/options'),
    countries: () =>
      get<OptionsResponseBasic<OptionBasicWithCode>>('country/options'),
    sports: () =>
      get<OptionsResponseBasic<OptionBasicWithCode>>('sport/options'),
    games: () => post<OptionsResponseBasic<GameOption>>('game/options'),
    leagueGroups: (game_code: string) =>
      post<OptionsResponseBasic<OptionBasicWithCode>>('league_group/options', {
        game_code,
      }),
    leagues: (game_code: string) =>
      post<OptionsResponseBasic<LeagueOption>>('league/options', {
        game_code,
      }),
    teams: (league_id: number) =>
      post<OptionsResponseBasic<OptionBasic>>('team/options', {
        league_id,
      }),
    faqCategorys: () =>
      get<OptionsResponseBasic<OptionBasic>>('qa_catalogue/options'),
  }
}

export default useOptionsAPI
