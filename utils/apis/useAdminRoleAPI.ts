import {
  AdminRole,
  AdminRoleActiveRequest,
  AdminRoleCreateRequest,
  AdminRoleEditRequest,
  AdminRoleListRequest,
  AdminRoleListResponse,
  AdminRoleStatusRequest,
} from '@/types/api/AdminRole'
import useRequest from '../useRequest'

function useAdminRoleAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AdminRoleListRequest) =>
      post<AdminRoleListResponse>('admin_user/list', req),
    fetchById: (id: number) => get<AdminRole>(`admin_user/view/${id}`),
    status: (req: AdminRoleStatusRequest) =>
      post<null>('admin_user/status', req),
    active: (req: AdminRoleActiveRequest) =>
      post<null>('admin_user/active', req),
    create: (req: AdminRoleCreateRequest) =>
      post<null>('admin_user/create', req),
    edit: (req: AdminRoleEditRequest) => post<null>('admin_user/edit', req),
  }
}

export default useAdminRoleAPI
