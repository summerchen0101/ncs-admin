import { OptionBasic } from '@/types'
import {
  OptionBasicWithCode,
  OptionsResponseBasic,
  PermissionOption,
} from '@/types/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { get, post } = useRequest()

  return {
    permissions: () =>
      get<OptionsResponseBasic<PermissionOption>>('admin_permission/options'),
    roles: () => get<OptionsResponseBasic<OptionBasic>>('admin_role/options'),
    countries: () =>
      get<OptionsResponseBasic<OptionBasicWithCode>>('country/options'),
    sports: () =>
      get<OptionsResponseBasic<OptionBasicWithCode>>('sport/options'),
    games: () =>
      post<OptionsResponseBasic<OptionBasicWithCode>>('sport_game/options'),
    leagues: (game_id: number) =>
      post<OptionsResponseBasic<OptionBasic>>('sport_league/options', {
        game_id,
      }),
    teams: (league_id: number) =>
      post<OptionsResponseBasic<OptionBasic>>('sport_team/options', {
        league_id,
      }),
    faqCategorys: () =>
      get<OptionsResponseBasic<OptionBasic>>('qa_catalogue/options'),
  }
}

export default useOptionsAPI
