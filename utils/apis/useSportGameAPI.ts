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
      post<SportGameListResponse>('sport_game/list', req),
    fetchById: (id: number) => get<SportGame>(`sport_game/view/${id}`),
    active: (req: SportGameActiveRequest) =>
      post<null>('sport_game/active', req),
    create: (req: SportGameCreateRequest) => post<null>('sport_game/add', req),
    edit: (req: SportGameEditRequest) => post<null>('sport_game/edit', req),
    removeById: (id: number) => post<null>('sport_game/remove', { id }),
  }
}

export default useSportGameAPI
