import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { DailyReport, DailyReportListRequest } from '@/types/api/DailyReport'
import { useToast } from '@chakra-ui/react'
import useDailyReportAPI from '../apis/useDailyReportAPI'
import useErrorHandler from '../useErrorHandler'

function useDailyReportService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<DailyReport>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<DailyReportListRequest>()
  const API = useDailyReportAPI()
  const toast = useToast()

  const fetchList = async (req?: DailyReportListRequest) => {
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

export default useDailyReportService
