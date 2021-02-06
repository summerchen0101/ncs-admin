import {
  LeagueGroup,
  LeagueGroupActiveRequest,
  LeagueGroupCreateRequest,
  LeagueGroupEditRequest,
  LeagueGroupListRequest,
  LeagueGroupListResponse,
} from '@/types/api/LeagueGroup'
import useRequest from '../useRequest'

function useLeagueGroupAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: LeagueGroupListRequest) =>
      post<LeagueGroupListResponse>('league_group/list', req),
    fetchById: (id: number) => get<LeagueGroup>(`league_group/view/${id}`),
    active: (req: LeagueGroupActiveRequest) =>
      post<null>('league_group/active', req),
    create: (req: LeagueGroupCreateRequest) =>
      post<null>('league_group/add', req),
    edit: (req: LeagueGroupEditRequest) => post<null>('league_group/edit', req),
    removeById: (id: number) => post<null>('league_group/remove', { id }),
  }
}

export default useLeagueGroupAPI
