import {
  ProfitReportListRequest,
  ProfitReportListResponse,
} from '@/types/api/ProfitReport'
import useRequest from '../useRequest'

function useProfitReportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: ProfitReportListRequest) =>
      post<ProfitReportListResponse>('report/profit', req),
  }
}

export default useProfitReportAPI
