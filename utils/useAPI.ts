import { BlockStatus } from '@/lib/enums'
import { MemberBasic } from '@/lib/types'
import { LoginRequest, LoginResponse } from '@/types/api/login'
import {
  AdminUser,
  AdminUserListRequest,
  AdminUserListResponse,
  AdminUserStatusRequest,
} from '@/types/api/user'
import useRequest from './useRequest'

function useAPI() {
  const { get, post } = useRequest()

  const auth = {
    login: (req: LoginRequest) => post<LoginResponse>('login', req),
    logout: () => get<null>('logout'),
    checkLogin: () => get<MemberBasic & { token: string }>('check_login'),
  }

  const user = {
    fetchAll: (req: AdminUserListRequest) =>
      post<AdminUserListResponse>('admin_user/list', req),
    fetchById: (id: number) => get<AdminUser>(`admin_user/view/${id}`),
    status: (req: AdminUserStatusRequest) =>
      post<null>('admin_user/status', req),
  }

  return {
    auth,
    user,
  }
}

export default useAPI
