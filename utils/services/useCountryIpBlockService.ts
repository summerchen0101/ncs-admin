import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  CountryIpBlock,
  CountryIpBlockCreateRequest,
  CountryIpBlockEditRequest,
  CountryIpBlockListRequest,
} from '@/types/api/CountryIpBlock'
import { useToast } from '@chakra-ui/react'
import useCountryIpBlockAPI from '../apis/useCountryIpBlockAPI'
import useErrorHandler from '../useErrorHandler'

function useCountryIpBlockService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<CountryIpBlock>()
  const { setSearch } = useSearchContext<CountryIpBlockListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useCountryIpBlockAPI()
  const toast = useToast()

  const fetchList = async (req?: CountryIpBlockListRequest) => {
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
  const doCreate = async (req: CountryIpBlockCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: CountryIpBlockEditRequest) => {
    try {
      await API.edit(req)
      setSearch((s) => ({ ...s }))
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
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
    doCreate,
    doEdit,
    doDelete,
  }
}

export default useCountryIpBlockService
