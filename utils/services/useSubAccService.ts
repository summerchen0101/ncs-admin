import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { BlockStatus } from '@/lib/enums'
import {
  SubAcc,
  SubAccCreateRequest,
  SubAccEditRequest,
  SubAccListRequest,
} from '@/types/api/SubAcc'
import { useToast } from '@chakra-ui/react'
import useSubAccAPI from '../apis/useSubAccAPI'
import useErrorHandler from '../useErrorHandler'

function useSubAccService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<SubAcc>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  // const { setSearch } = useSearchContext<SubAccListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setPassVisible] = usePopupContext('passForm')
  const API = useSubAccAPI()
  const toast = useToast()

  const fetchList = async (req?: Partial<SubAccListRequest>) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchById = async (id: number) => {
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
      fetchList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: BlockStatus) => {
    try {
      await API.status({ id, status })
      fetchList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: SubAccCreateRequest) => {
    try {
      await API.create(req)
      fetchList()
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: SubAccEditRequest) => {
    try {
      await API.edit(req)
      fetchList()
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      fetchList()
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
    fetchList,
    fetchById,
    setActive,
    setStatus,
    doCreate,
    doEdit,
    doDelete,
    doEditPass,
  }
}

export default useSubAccService
