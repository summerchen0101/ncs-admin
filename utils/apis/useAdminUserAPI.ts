import {
  AdminUser,
  AdminUserActiveRequest,
  AdminUserCreateRequest,
  AdminUserEditRequest,
  AdminUserListRequest,
  AdminUserListResponse,
  AdminUserStatusRequest,
} from '@/types/api/AdminUser'
import useRequest from '../useRequest'

function useAdminUserAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AdminUserListRequest) =>
      post<AdminUserListResponse>('admin_user/list', req),
    fetchById: (id: number) => get<AdminUser>(`admin_user/view/${id}`),
    status: (req: AdminUserStatusRequest) =>
      post<null>('admin_user/status', req),
    active: (req: AdminUserActiveRequest) =>
      post<null>('admin_user/active', req),
    create: (req: AdminUserCreateRequest) => post<null>('admin_user/add', req),
    edit: (req: AdminUserEditRequest) => post<null>('admin_user/edit', req),
  }
}

export default useAdminUserAPI
