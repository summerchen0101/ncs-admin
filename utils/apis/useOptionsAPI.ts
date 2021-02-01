import { PermissionOptionResponse } from '@/types/api/options'
import useRequest from '../useRequest'

function useOptionsAPI() {
  const { get, post } = useRequest()

  return {
    permission: () => get<PermissionOptionResponse>('admin_permission/options'),
    adminRole: () => get<PermissionOptionResponse>('admin_role/options'),
  }
}

export default useOptionsAPI
