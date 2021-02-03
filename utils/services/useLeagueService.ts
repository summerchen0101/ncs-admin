import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import {
  League,
  LeagueCreateRequest,
  LeagueEditRequest,
  LeagueListRequest,
} from '@/types/api/League'
import { useToast } from '@chakra-ui/react'
import useLeagueAPI from '../apis/useLeagueAPI'
import useErrorHandler from '../useErrorHandler'

function useLeagueService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, search, setSearch } = useDataContext<
    League,
    LeagueListRequest
  >()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useLeagueAPI()
  const toast = useToast()

  const fetchList = async (req?: LeagueListRequest) => {
    const _req = {
      page: 1,
      perpage: 50,
      ...search,
      ...req,
    }
    if (!_req.game_id) return
    try {
      const res = await API.fetchAll(_req)
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
  const setActive = async (
    id: number,
    is_active: boolean,
    search: LeagueListRequest,
  ) => {
    try {
      await API.active({ id, is_active })
      setSearch(search)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: LeagueCreateRequest) => {
    try {
      await API.create(req)
      setSearch({ game_id: req.game_id })
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: LeagueEditRequest) => {
    try {
      await API.edit(req)
      setSearch({ game_id: req.game_id })
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number, search: LeagueListRequest) => {
    try {
      await API.removeById(id)
      setSearch(search)
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setActive,
    doCreate,
    doEdit,
    doDelete,
  }
}

export default useLeagueService
