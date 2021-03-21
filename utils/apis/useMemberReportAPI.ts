import {
  MemberReport,
  MemberReportListRequest,
  MemberReportListResponse,
} from '@/types/api/MemberReport'
import useRequest from '../useRequest'

function useMemberReportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberReportListRequest) =>
      post<MemberReportListResponse>('report/member', req),
  }
}

export default useMemberReportAPI
