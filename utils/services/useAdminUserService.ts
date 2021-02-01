import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import {
  AdminUser,
  AdminUserCreateRequest,
  AdminUserListRequest,
} from '@/types/api/user'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import useAdminUserAPI from '../apis/useAdminUserAPI'
import useErrorHandler from '../useErrorHandler'

function useAdminUserService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<AdminUser>()
  const [_, setEditVisible] = usePopupContext('editForm')
  const API = useAdminUserAPI()
  const toast = useToast()
  const router = useRouter()

  const fetchUserList = async (req?: AdminUserListRequest) => {
    try {
      const res = await API.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchUserById = async (id: number) => {
    try {
      const res = await API.fetchById(id)
      setViewData(res.data)
      setEditVisible(true)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: BlockStatus) => {
    try {
      await API.status({ id, status })
      await fetchUserList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setActive = async (id: number, is_active: boolean) => {
    try {
      await API.active({ id, is_active })
      await fetchUserList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: AdminUserCreateRequest) => {
    try {
      await API.create(req)
      await fetchUserList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchUserList,
    fetchUserById,
    setStatus,
    setActive,
    doCreate,
  }
}

export default useAdminUserService
