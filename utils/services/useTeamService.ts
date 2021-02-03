import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import {
  Team,
  TeamCreateRequest,
  TeamEditRequest,
  TeamListRequest,
} from '@/types/api/Team'
import { useToast } from '@chakra-ui/react'
import useTeamAPI from '../apis/useTeamAPI'
import useErrorHandler from '../useErrorHandler'

function useTeamService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setSearch, search } = useDataContext<
    Team,
    TeamListRequest
  >()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useTeamAPI()
  const toast = useToast()

  const fetchList = async (req?: TeamListRequest) => {
    const _req = {
      page: 1,
      perpage: 50,
      ...search,
      ...req,
    }
    if (!_req.league_id) return
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
    search: TeamListRequest,
  ) => {
    try {
      await API.active({ id, is_active })
      setSearch(search)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: TeamCreateRequest) => {
    try {
      await API.create(req)
      setSearch({ league_id: req.league_id })
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: TeamEditRequest) => {
    try {
      await API.edit(req)
      setSearch({ league_id: req.league_id })
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number, search: TeamListRequest) => {
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

export default useTeamService
