import { OptionBasic } from '@/types'
import { OptionsResponseBasic, PermissionOption } from '@/types/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { get, post } = useRequest()

  return {
    permissions: () =>
      get<OptionsResponseBasic<PermissionOption>>('admin_permission/options'),
    roles: () => get<OptionsResponseBasic<OptionBasic>>('admin_role/options'),
    countries: () => get<OptionsResponseBasic<OptionBasic>>('country/options'),
    sports: () => get<OptionsResponseBasic<OptionBasic>>('sport/options'),
    games: () => post<OptionsResponseBasic<OptionBasic>>('sport_game/options'),
    leagues: (game_id: number) =>
      post<OptionsResponseBasic<OptionBasic>>('sport_league/options', {
        game_id,
      }),
    teams: (league_id: number) =>
      post<OptionsResponseBasic<OptionBasic>>('sport_team/options', {
        league_id,
      }),
  }
}

export default useOptionsAPI
