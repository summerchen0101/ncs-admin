import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { BlockStatus } from '@/lib/enums'
import {
  AdminUser,
  AdminUserCreateRequest,
  AdminUserEditRequest,
  AdminUserListRequest,
} from '@/types/api/AdminUser'
import { useToast } from '@chakra-ui/react'
import useAdminUserAPI from '../apis/useAdminUserAPI'
import useErrorHandler from '../useErrorHandler'

function useAdminUserService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<AdminUser>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setPassVisible] = usePopupContext('passwordForm')
  const API = useAdminUserAPI()
  const toast = useToast()

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
  const setActive = async (id: number, is_active: boolean) => {
    try {
      await API.active({ id, is_active })
      await fetchUserList()
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
  const doCreate = async (req: AdminUserCreateRequest) => {
    try {
      await API.create(req)
      await fetchUserList()
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: AdminUserEditRequest) => {
    try {
      await API.edit(req)
      await fetchUserList()
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      await fetchUserList()
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEditPass = async (id: number, pass: string) => {
    try {
      await API.pass(id, pass)
      setPassVisible(false)
      toast({ status: 'success', title: '密碼修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchUserList,
    fetchUserById,
    setActive,
    setStatus,
    doCreate,
    doEdit,
    doDelete,
    doEditPass,
  }
}

export default useAdminUserService
