import { OptionBasic } from '@/types'
import { OptionsResponseBasic, PermissionOption } from '@/types/api/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { get, post } = useRequest()

  return {
    permissions: () =>
      get<OptionsResponseBasic<PermissionOption>>('admin_permission/options'),
    roles: () => get<OptionsResponseBasic<OptionBasic>>('admin_role/options'),
  }
}

export default useOptionsAPI
