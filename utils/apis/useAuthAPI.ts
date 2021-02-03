import {
  CheckLoginResponse,
  LoginRequest,
  LoginResponse,
} from '@/types/api/Auth'

import useRequest from '../useRequest'

function useAuthAPI() {
  const { get, post } = useRequest()

  return {
    login: (req: LoginRequest) => post<LoginResponse>('login', req),
    logout: () => get<null>('logout'),
    checkLogin: () => get<CheckLoginResponse>('check_login'),
  }
}

export default useAuthAPI
