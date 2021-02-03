import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import {
  ActivityReview,
  ActivityReviewListRequest,
} from '@/types/api/ActivityReview'
import { useToast } from '@chakra-ui/react'
import useActivityReviewAPI from '../apis/useActivityReviewAPI'
import useErrorHandler from '../useErrorHandler'

function useActivityReviewService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<ActivityReview>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useActivityReviewAPI()
  const toast = useToast()

  const fetchList = async (req?: ActivityReviewListRequest) => {
    try {
      const res = await API.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchById = async (id: number) => {
    try {
      const res = await API.fetchById(id)
      setViewData(res.data)
      setEditVisible(true)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: ProcessStatus) => {
    try {
      await API.status(id, status)
      await fetchList()
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setStatus,
  }
}

export default useActivityReviewService
