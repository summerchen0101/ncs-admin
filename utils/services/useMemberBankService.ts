import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberBank, MemberBankListRequest } from '@/types/api/MemberBank'
import { useToast } from '@chakra-ui/react'
import useMemberBankAPI from '../apis/useMemberBankAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberBankService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<MemberBank>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<MemberBankListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useMemberBankAPI()

  const fetchList = async (req?: MemberBankListRequest) => {
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
      setEditVisible(true)
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

export default useMemberBankService
