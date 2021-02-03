import {
  Sport,
  SportActiveRequest,
  SportCreateRequest,
  SportEditRequest,
  SportListRequest,
  SportListResponse,
} from '@/types/api/Sport'
import useRequest from '../useRequest'

function useSportAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: SportListRequest) =>
      post<SportListResponse>('country/list', req),
    fetchById: (id: number) => get<Sport>(`country/view/${id}`),
    active: (req: SportActiveRequest) => post<null>('country/active', req),
    create: (req: SportCreateRequest) => post<null>('country/add', req),
    edit: (req: SportEditRequest) => post<null>('country/edit', req),
    removeById: (id: number) => post<null>('country/remove', { id }),
  }
}

export default useSportAPI
