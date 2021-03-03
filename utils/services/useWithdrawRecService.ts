import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import { WithdrawRec, WithdrawRecListRequest } from '@/types/api/WithdrawRec'
import { useToast } from '@chakra-ui/react'
import useWithdrawRecAPI from '../apis/useWithdrawRecAPI'
import useErrorHandler from '../useErrorHandler'

function useWithdrawRecService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<WithdrawRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<WithdrawRecListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useWithdrawRecAPI()
  const toast = useToast()

  const fetchList = async (req?: WithdrawRecListRequest) => {
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
  const setStatus = async (id: number, status: ProcessStatus) => {
    try {
      await API.status(id, status)
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setStatus,
  }
}

export default useWithdrawRecService
