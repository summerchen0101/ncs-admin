import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberBank, MemberBankListRequest } from '@/types/api/MemberBank'
import { useToast } from '@chakra-ui/react'
import useMemberBankAPI from '../apis/useMemberBankAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberBankService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<MemberBank>()
  const { setSearch } = useSearchContext<MemberBankListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useMemberBankAPI()

  const fetchList = async (req?: MemberBankListRequest) => {
    try {
      const res = await API.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const viewWithData = (data: MemberBank) => {
    try {
      setViewData(data)
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
    viewWithData,
    setConfirm,
  }
}

export default useMemberBankService
