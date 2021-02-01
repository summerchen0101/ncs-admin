import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import {} from '@/types/api/options'
import { useToast } from '@chakra-ui/react'
import useOptionsAPI from '../apis/useOptionsAPI'
import useErrorHandler from '../useErrorHandler'

function useOptionsService() {
  const { apiErrHandler } = useErrorHandler()
  const [, setRoles] = useOptionsContext('roles')
  const [, setPermissions] = useOptionsContext('permissions')
  const API = useOptionsAPI()

  const fetchPermissionOptions = async () => {
    try {
      const res = await API.permissions()
      setPermissions(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchRoleOptions = async () => {
    try {
      const res = await API.roles()
      setRoles(res.data.list)
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
