import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProfitReport, ProfitReportListRequest } from '@/types/api/ProfitReport'
import { useToast } from '@chakra-ui/react'
import useProfitReportAPI from '../apis/useProfitReportAPI'
import useErrorHandler from '../useErrorHandler'

function useProfitReportService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<ProfitReport>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<ProfitReportListRequest>()
  const API = useProfitReportAPI()
  const toast = useToast()

  const fetchList = async (req?: ProfitReportListRequest) => {
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

export default useProfitReportService
