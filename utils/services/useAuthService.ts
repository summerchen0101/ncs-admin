import { useGlobalContext } from '@/context/GlobalContext'
import { LoginRequest } from '@/types/api/Auth'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import useAuthAPI from '../apis/useAuthAPI'
import useErrorHandler from '../useErrorHandler'

function useAuthService() {
  const { apiErrHandler } = useErrorHandler()
  const { setToken, setUser } = useGlobalContext()
  const API = useAuthAPI()
  const toast = useToast()
  const router = useRouter()
  const { from } = router.query
  const onLogin = async (req: LoginRequest) => {
    try {
      const res = await API.login(req)
      setToken(res.data.token)
      setUser(res.data)
      await router.push((from as string) || '/home')
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const onLogout = async () => {
    try {
      await API.logout()
      await router.push('/login')
      setToken('')
      setUser(null)
      toast({ status: 'success', title: '登出成功', duration: 2000 })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const checkUserStatus = async () => {
    try {
      const res = await API.checkLogin()
      setUser(res.data.member)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    onLogin,
    onLogout,
    checkUserStatus,
  }
}

export default useAuthService
