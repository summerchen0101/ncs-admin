import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DepositRec, DepositRecListRequest } from '@/types/api/DepositRec'
import { useToast } from '@chakra-ui/react'
import useDepositRecAPI from '../apis/useDepositRecAPI'
import useErrorHandler from '../useErrorHandler'

function useDepositRecService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<DepositRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<DepositRecListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useDepositRecAPI()
  const toast = useToast()

  const fetchList = async (req?: DepositRecListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
  }
}

export default useDepositRecService
