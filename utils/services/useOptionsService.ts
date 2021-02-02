import { useOptionsContext } from '@/context/OptionsContext'
import { OptionBasic } from '@/types'
import useOptionsAPI from '../apis/useOptionsAPI'
import useErrorHandler from '../useErrorHandler'

const toOptionTypes = (opts: OptionBasic[]) =>
  opts.map((t) => ({ label: t.name, value: t.id }))

function useOptionsService() {
  const { apiErrHandler } = useErrorHandler()
  const [, setRoles] = useOptionsContext('roles')
  const [, setPermissions] = useOptionsContext('permissions')
  const API = useOptionsAPI()

  const fetchPermissionOptions = async () => {
    try {
      const res = await API.permissions()
      setPermissions(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchRoleOptions = async () => {
    try {
      const res = await API.roles()
      setRoles(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchPermissionOptions,
    fetchRoleOptions,
  }
}

export default useOptionsService
