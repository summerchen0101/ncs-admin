import { useGlobalProvider } from '@/context/GlobalContext'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import useAPI from './useAPI'
import useErrorHandler from './useErrorHandler'

function useService() {
  const { apiErrHandler } = useErrorHandler()
  const { setToken } = useGlobalProvider()
  const API = useAPI('auth')
  const toast = useToast()
  const router = useRouter()
  const onLogout = async () => {
    try {
      await API.logout()
      await router.push('/login')
      setToken('')
      toast({ status: 'success', title: '登出成功', duration: 2000 })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    onLogout,
  }
}

export default useService
