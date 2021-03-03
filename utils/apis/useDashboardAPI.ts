import { Dashboard, DashboardRequest } from '@/types/api/Dashboard'
import useRequest from '../useRequest'

function useDashboardAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: DashboardRequest) => post<Dashboard>('dashboard', req),
  }
}

export default useDashboardAPI
