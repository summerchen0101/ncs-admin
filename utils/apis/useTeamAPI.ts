import {
  Team,
  TeamActiveRequest,
  TeamCreateRequest,
  TeamEditRequest,
  TeamListRequest,
  TeamListResponse,
} from '@/types/api/Team'
import useRequest from '../useRequest'

function useTeamAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: TeamListRequest) =>
      post<TeamListResponse>('sport_team/list', req),
    fetchById: (id: number) => get<Team>(`sport_team/view/${id}`),
    active: (req: TeamActiveRequest) => post<null>('sport_team/active', req),
    create: (req: TeamCreateRequest) => post<null>('sport_team/add', req),
    edit: (req: TeamEditRequest) => post<null>('sport_team/edit', req),
    removeById: (id: number) => post<null>('sport_team/remove', { id }),
  }
}

export default useTeamAPI
