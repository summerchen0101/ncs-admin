import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { RealName, RealNameListRequest } from '@/types/api/RealName'
import { useToast } from '@chakra-ui/react'
import useRealNameAPI from '../apis/useRealNameAPI'
import useErrorHandler from '../useErrorHandler'

function useRealNameService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<RealName>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<RealNameListRequest>()
  const [, setViewVisible] = usePopupContext('view')
  const API = useRealNameAPI()

  const fetchList = async (req?: RealNameListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchById = async (id: number) => {
    try {
      const res = await API.fetchById(id)
      setViewData(res.data)
      setViewVisible(true)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setConfirm = async (id: number, is_active: boolean) => {
    try {
      await API.confirm({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
    fetchById,
    setConfirm,
  }
}

export default useRealNameService
