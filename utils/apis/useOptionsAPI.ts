import { OptionBasic } from '@/types'
import {
  GameOption,
  LeagueOption,
  MemberTagOption,
  MenuOption,
  OptionBasicWithCode,
  OptionsResponseBasic,
  PermissionOption,
} from '@/types/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { post } = useRequest()

  return {
    menus: () => post<OptionsResponseBasic<MenuOption>>('admin_menu/options'),
    permissions: () =>
      post<OptionsResponseBasic<PermissionOption>>('admin_permission/options'),
    roles: () => post<OptionsResponseBasic<OptionBasic>>('admin_role/options'),
    countries: () =>
      post<OptionsResponseBasic<OptionBasicWithCode>>('country/options'),
    sports: () =>
      post<OptionsResponseBasic<OptionBasicWithCode>>('sport/options'),
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
      post<OptionsResponseBasic<OptionBasic>>('qa_catalogue/options'),
    tags: () =>
      post<OptionsResponseBasic<MemberTagOption>>('member_tag/options'),
    affiliateLevels: () =>
      post<OptionsResponseBasic<OptionBasic>>('promo_level/options'),
    thirdPartys: () =>
      post<OptionsResponseBasic<OptionBasic>>('payment_system/options'),
    cashflowGroups: () =>
      post<OptionsResponseBasic<OptionBasic>>('payment_group/options'),
  }
}

export default useOptionsAPI
