import {
  Dashboard,
  DashboardListRequest,
  DashboardListResponse,
} from '@/types/api/Dashboard'
import useRequest from '../useRequest'

function useDashboardAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: DashboardListRequest) =>
      post<DashboardListResponse>('dashboard', req),
  }
}

export default useDashboardAPI
