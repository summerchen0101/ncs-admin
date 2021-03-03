import { useDataContext } from '@/context/DataContext'
import { DashboardRequest } from '@/types/api/Dashboard'
import { useToast } from '@chakra-ui/react'
import useDashboardAPI from '../apis/useDashboardAPI'
import useErrorHandler from '../useErrorHandler'

function useDashboardService() {
  const { apiErrHandler } = useErrorHandler()
  const { setDashboardInfo } = useDataContext()
  const API = useDashboardAPI()
  const toast = useToast()

  const fetchList = async (req?: DashboardRequest) => {
    try {
      const res = await API.fetchAll(req)
      setDashboardInfo(res.data)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useDashboardService
