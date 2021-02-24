import {
  AgentReport,
  AgentReportListRequest,
  AgentReportListResponse,
} from '@/types/api/AgentReport'
import useRequest from '../useRequest'

function useAgentReportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AgentReportListRequest) =>
      post<AgentReportListResponse>('report/agent', req),
  }
}

export default useAgentReportAPI
