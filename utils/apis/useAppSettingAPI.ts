import { AppSetting, AppSettingEditRequest } from '@/types/api/AppSetting'
import useRequest from '../useRequest'

function useAppSettingAPI() {
  const { get, post } = useRequest()

  return {
    fetchById: () => get<AppSetting>('app_setting/view'),
    edit: (req: AppSettingEditRequest) => post<null>('app_setting/edit', req),
  }
}

export default useAppSettingAPI
