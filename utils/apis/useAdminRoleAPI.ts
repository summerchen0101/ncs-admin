import {
  AdminRole,
  AdminRoleActiveRequest,
  AdminRoleCreateRequest,
  AdminRoleEditRequest,
  AdminRoleListRequest,
  AdminRoleListResponse,
} from '@/types/api/AdminRole'
import useRequest from '../useRequest'

function useAdminRoleAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AdminRoleListRequest) =>
      post<AdminRoleListResponse>('admin_role/list', req),
    fetchById: (id: number) => get<AdminRole>(`admin_role/view/${id}`),
    active: (req: AdminRoleActiveRequest) =>
      post<null>('admin_role/active', req),
    create: (req: AdminRoleCreateRequest) => post<null>('admin_role/add', req),
    edit: (req: AdminRoleEditRequest) => post<null>('admin_role/edit', req),
  }
}

export default useAdminRoleAPI
