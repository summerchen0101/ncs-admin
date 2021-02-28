import {
  DailyReport,
  DailyReportListRequest,
  DailyReportListResponse,
} from '@/types/api/DailyReport'
import useRequest from '../useRequest'

function useDailyReportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: DailyReportListRequest) =>
      post<DailyReportListResponse>('report/daily_summary', req),
  }
}

export default useDailyReportAPI
