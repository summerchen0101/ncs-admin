import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { WalletRec, WalletRecListRequest } from '@/types/api/WalletRec'
import { useToast } from '@chakra-ui/react'
import useWalletRecAPI from '../apis/useWalletRecAPI'
import useErrorHandler from '../useErrorHandler'

function useWalletRecService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setWalletRecSummary } = useDataContext<WalletRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<WalletRecListRequest>()
  const API = useWalletRecAPI()
  const toast = useToast()

  const fetchList = async (req?: WalletRecListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setWalletRecSummary(res.data.summary)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useWalletRecService
