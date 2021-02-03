import {
  League,
  LeagueActiveRequest,
  LeagueCreateRequest,
  LeagueEditRequest,
  LeagueListRequest,
  LeagueListResponse,
} from '@/types/api/League'
import useRequest from '../useRequest'

function useLeagueAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: LeagueListRequest) =>
      post<LeagueListResponse>('sport_league/list', req),
    fetchById: (id: number) => get<League>(`sport_league/view/${id}`),
    active: (req: LeagueActiveRequest) =>
      post<null>('sport_league/active', req),
    create: (req: LeagueCreateRequest) => post<null>('sport_league/add', req),
    edit: (req: LeagueEditRequest) => post<null>('sport_league/edit', req),
    removeById: (id: number) => post<null>('sport_league/remove', { id }),
  }
}

export default useLeagueAPI
