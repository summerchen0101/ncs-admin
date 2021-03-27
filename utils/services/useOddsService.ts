import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  Odds,
  OddsCreateRequest,
  OddsCtrlRequest,
  OddsEditRequest,
  OddsListRequest,
} from '@/types/api/Odds'
import { useToast } from '@chakra-ui/react'
import useOddsAPI from '../apis/useOddsAPI'
import useErrorHandler from '../useErrorHandler'

function useOddsService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<Odds>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<OddsListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useOddsAPI()
  const toast = useToast()

  const fetchList = async (req?: OddsListRequest) => {
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
  const setActive = async (
    id: number,
    section_code: string,
    is_active: boolean,
  ) => {
    try {
      await API.active({ ids: [id], is_active, section_code })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setOpenBet = async (
    id: number,
    section_code: string,
    is_active: boolean,
  ) => {
    try {
      await API.openBet({ ids: [id], is_active, section_code })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setAutoOdds = async (id: number, is_active: boolean) => {
    try {
      await API.autoOdds({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: OddsCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doLiveEdit = async (req: OddsEditRequest) => {
    try {
      await API.liveEdit(req)
      setSearch((s) => ({ ...s }))
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doDefaultEdit = async (req: OddsEditRequest) => {
    try {
      await API.defaultEdit(req)
      setSearch((s) => ({ ...s }))
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const addOdds = async ({ id, incr_odds, is_home }: OddsCtrlRequest) => {
    try {
      return await API.control({ id, incr_odds, is_home })
      // const res = await API.fetchById(id)
      // setViewData(res.data)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      setSearch((s) => ({ ...s }))
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setActive,
    setOpenBet,
    doCreate,
    doLiveEdit,
    doDefaultEdit,
    doDelete,
    setAutoOdds,
    addOdds,
  }
}

export default useOddsService
