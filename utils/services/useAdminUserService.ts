import { useDataContext } from '@/context/DataContext'
import { useGlobalProvider } from '@/context/GlobalContext'
import { BlockStatus } from '@/lib/enums'
import {
  AdminUser,
  AdminUserListRequest,
  AdminUserStatusRequest,
} from '@/types/api/user'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import useAPI from '../useAPI'
import useErrorHandler from '../useErrorHandler'

function useAdminUserService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList } = useDataContext<AdminUser>()
  const API = useAPI()
  const toast = useToast()
  const router = useRouter()

  const fetchUserList = async (req?: Parameters<typeof API.user.fetchAll>) => {
    try {
      const res = await API.user.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: BlockStatus) => {
    try {
      await API.user.status({ id, status })
      await fetchUserList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchUserList,
    setStatus,
  }
}

export default useAdminUserService
