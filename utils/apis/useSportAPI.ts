import {
  Sport,
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
      post<SportListResponse>('sport/list', req),
    fetchById: (id: number) => get<Sport>(`sport/view/${id}`),
    create: (req: SportCreateRequest) => post<null>('sport/add', req),
    edit: (req: SportEditRequest) => post<null>('sport/edit', req),
    removeById: (id: number) => post<null>('sport/remove', { id }),
  }
}

export default useSportAPI
