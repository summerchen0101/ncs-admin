import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  MemberLog,
  MemberLogListRequest,
  MemberLogRemoveAllRequest,
} from '@/types/api/MemberLog'
import { useToast } from '@chakra-ui/react'
import useMemberLogAPI from '../apis/useMemberLogAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberLogService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<MemberLog>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<MemberLogListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useMemberLogAPI()
  const toast = useToast()

  const fetchList = async (req?: MemberLogListRequest) => {
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

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      setSearch((s) => ({ ...s }))
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doDeleteAll = async (req: MemberLogRemoveAllRequest) => {
    try {
      await API.removeAll(req)
      setSearch((s) => ({ ...s }))
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    doDelete,
    doDeleteAll,
  }
}

export default useMemberLogService
