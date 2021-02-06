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
      post<LeagueListResponse>('league/list', req),
    fetchById: (id: number) => get<League>(`league/view/${id}`),
    active: (req: LeagueActiveRequest) => post<null>('league/active', req),
    create: (req: LeagueCreateRequest) => post<null>('league/add', req),
    edit: (req: LeagueEditRequest) => post<null>('league/edit', req),
    removeById: (id: number) => post<null>('league/remove', { id }),
  }
}

export default useLeagueAPI
