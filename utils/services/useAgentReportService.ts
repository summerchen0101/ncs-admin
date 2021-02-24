import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { AgentReport, AgentReportListRequest } from '@/types/api/AgentReport'
import { useToast } from '@chakra-ui/react'
import useAgentReportAPI from '../apis/useAgentReportAPI'
import useErrorHandler from '../useErrorHandler'

function useAgentReportService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<AgentReport>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<AgentReportListRequest>()
  const API = useAgentReportAPI()
  const toast = useToast()

  const fetchList = async (req?: AgentReportListRequest) => {
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

export default useAgentReportService
