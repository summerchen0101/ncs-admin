import {
  Activity,
  ActivityActiveRequest,
  ActivityCreateRequest,
  ActivityEditRequest,
  ActivityListRequest,
  ActivityListResponse,
} from '@/types/api/Activity'
import useRequest from '../useRequest'

function useActivityAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: ActivityListRequest) =>
      post<ActivityListResponse>('activity/list', req),
    fetchById: (id: number) => get<Activity>(`activity/view/${id}`),
    active: (req: ActivityActiveRequest) => post<null>('activity/active', req),
    create: (req: ActivityCreateRequest) => post<null>('activity/add', req),
    edit: (req: ActivityEditRequest) => post<null>('activity/edit', req),
    removeById: (id: number) => post<null>('activity/remove', { id }),
  }
}

export default useActivityAPI
