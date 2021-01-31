import { LoginRequest, LoginResponse } from '@/types/api/login'
import useRequest from './useRequest'

function useAPI(category: keyof typeof apis) {
  const { get, post } = useRequest()

  const auth = {
    login: (req: LoginRequest) => post<LoginResponse>('login', req),
    logout: () => get<null>('logout'),
    checkLogin: () => get<null>('check_login'),
  }

  const apis = {
    auth,
  }
  return apis[category]
}

export default useAPI
