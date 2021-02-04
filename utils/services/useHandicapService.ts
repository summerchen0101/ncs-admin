import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { Handicap, HandicapListRequest } from '@/types/api/Handicap'
import { useToast } from '@chakra-ui/react'
import useHandicapAPI from '../apis/useHandicapAPI'
import useErrorHandler from '../useErrorHandler'

function useHandicapService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<Handicap>()
  const { setSearch } = useSearchContext<HandicapListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useHandicapAPI()
  const toast = useToast()

  const fetchList = async (req?: HandicapListRequest) => {
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
  const setActive = async (id: number, is_active: boolean) => {
    try {
      await API.active({ id, is_active })
      setSearch((s) => ({ ...s }))
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
    fetchById,
    setActive,
    setOpenBet,
    setAutoAccounting,
  }
}

export default useHandicapService
