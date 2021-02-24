import { useDataContext } from '@/context/DataContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  MemberActivity,
  MemberActivityListRequest,
} from '@/types/api/MemberActivity'
import { useToast } from '@chakra-ui/react'
import useMemberActivityAPI from '../apis/useMemberActivityAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberActivityService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<MemberActivity>()
  const { setSearch } = useSearchContext<MemberActivityListRequest>()
  const API = useMemberActivityAPI()
  const toast = useToast()

  const fetchList = async (req?: MemberActivityListRequest) => {
    try {
      const res = await API.fetchAll({
        page: 1,
        perpage: 50,
        ...req,
      })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useMemberActivityService
