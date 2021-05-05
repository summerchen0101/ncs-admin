import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import {
  WithdrawRec,
  WithdrawRecListRequest,
  WithdrawReviewRequest,
} from '@/types/api/WithdrawRec'
import { useToast } from '@chakra-ui/react'
import useWithdrawRecAPI from '../apis/useWithdrawRecAPI'
import useErrorHandler from '../useErrorHandler'

function useWithdrawRecService() {
  const { apiErrHandler } = useErrorHandler()
  const {
    setList,
    setViewData,
    setWithdrawSummary,
  } = useDataContext<WithdrawRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<WithdrawRecListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useWithdrawRecAPI()
  const toast = useToast()

  const fetchList = async (req?: WithdrawRecListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setWithdrawSummary(res.data.summary)
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
  const setStatus = async (req: WithdrawReviewRequest) => {
    try {
      await API.status(req)
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
