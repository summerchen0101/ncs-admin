import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  Handicap,
  HandicapCreateRequest,
  HandicapListRequest,
  HandicapResultRequest,
} from '@/types/api/Handicap'
import { useToast } from '@chakra-ui/react'
import useHandicapAPI from '../apis/useHandicapAPI'
import useErrorHandler from '../useErrorHandler'

function useHandicapService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData } = useDataContext<Handicap>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<HandicapListRequest>()
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useHandicapAPI()
  const toast = useToast()

  const fetchList = async (req?: HandicapListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setActive = async (id: number, is_active: boolean) => {
    try {
      await API.active({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: HandicapCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setOpenBet = async (id: number, is_active: boolean) => {
    try {
      await API.openBet({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setResult = async (req: HandicapResultRequest) => {
    try {
      await API.result(req)
      toast({ status: 'success', title: '結帳成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const setAutoAccounting = async (id: number, is_active: boolean) => {
    try {
      await API.autoAccounting({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
    setActive,
    doCreate,
    setOpenBet,
    setAutoAccounting,
    setResult,
  }
}

export default useHandicapService
