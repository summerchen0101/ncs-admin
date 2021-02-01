import {
  AdminUser,
  AdminUserListRequest,
  AdminUserListResponse,
  AdminUserStatusRequest,
} from '@/types/api/user'
import useRequest from '../useRequest'

function useAdminUserAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AdminUserListRequest) =>
      post<AdminUserListResponse>('admin_user/list', req),
    fetchById: (id: number) => get<AdminUser>(`admin_user/view/${id}`),
    status: (req: AdminUserStatusRequest) =>
      post<null>('admin_user/status', req),
  }
}

export default useAdminUserAPI
