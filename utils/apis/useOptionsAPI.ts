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
  }
}

export default useOptionsAPI
