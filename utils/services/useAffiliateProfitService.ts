import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import {
  AffiliateProfit,
  AffiliateProfitListRequest,
} from '@/types/api/AffiliateProfit'
import { useToast } from '@chakra-ui/react'
import useAffiliateProfitAPI from '../apis/useAffiliateProfitAPI'
import useErrorHandler from '../useErrorHandler'

function useAffiliateProfitService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<AffiliateProfit>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<AffiliateProfitListRequest>()
  const API = useAffiliateProfitAPI()
  const toast = useToast()

  const fetchList = async (req?: AffiliateProfitListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: ProcessStatus) => {
    try {
      await API.confirm(id, status)
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    setStatus,
  }
}

export default useAffiliateProfitService
