import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { TransferRec, TransferRecListRequest } from '@/types/api/TransferRec'
import { useToast } from '@chakra-ui/react'
import useTransferRecAPI from '../apis/useTransferRecAPI'
import useErrorHandler from '../useErrorHandler'

function useTransferRecService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<TransferRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<TransferRecListRequest>()
  const API = useTransferRecAPI()
  const toast = useToast()

  const fetchList = async (req?: TransferRecListRequest) => {
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

export default useTransferRecService
