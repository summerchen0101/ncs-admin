import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { AppSetting, AppSettingEditRequest } from '@/types/api/AppSetting'
import { useToast } from '@chakra-ui/react'
import useAppSettingAPI from '../apis/useAppSettingAPI'
import useErrorHandler from '../useErrorHandler'

function useAppSettingService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<AppSetting>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useAppSettingAPI()
  const toast = useToast()

  const fetchById = async () => {
    try {
      const res = await API.fetchById()
      setViewData(res.data)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doEdit = async (req: AppSettingEditRequest) => {
    try {
      await API.edit(req)
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchById,
    doEdit,
  }
}

export default useAppSettingService
