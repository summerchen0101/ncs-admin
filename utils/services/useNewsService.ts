import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import {
  News,
  NewsCreateRequest,
  NewsEditRequest,
  NewsListRequest,
} from '@/types/api/News'
import { useToast } from '@chakra-ui/react'
import useNewsAPI from '../apis/useNewsAPI'
import useErrorHandler from '../useErrorHandler'

function useNewsService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<News>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useNewsAPI()
  const toast = useToast()

  const fetchList = async (req?: NewsListRequest) => {
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
      await fetchList()
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: NewsCreateRequest) => {
    try {
      await API.create(req)
      await fetchList()
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: NewsEditRequest) => {
    try {
      await API.edit(req)
      await fetchList()
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      await fetchList()
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

export default useNewsService