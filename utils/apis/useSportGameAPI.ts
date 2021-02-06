import {
  SportGame,
  SportGameActiveRequest,
  SportGameCreateRequest,
  SportGameEditRequest,
  SportGameListRequest,
  SportGameListResponse,
} from '@/types/api/SportGame'
import useRequest from '../useRequest'

function useSportGameAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: SportGameListRequest) =>
      post<SportGameListResponse>('game/list', req),
    fetchById: (id: number) => get<SportGame>(`game/view/${id}`),
    active: (req: SportGameActiveRequest) => post<null>('game/active', req),
    create: (req: SportGameCreateRequest) => post<null>('game/add', req),
    edit: (req: SportGameEditRequest) => post<null>('game/edit', req),
    removeById: (id: number) => post<null>('game/remove', { id }),
  }
}

export default useSportGameAPI
