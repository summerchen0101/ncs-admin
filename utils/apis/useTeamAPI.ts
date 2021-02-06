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
      post<TeamListResponse>('team/list', req),
    fetchById: (id: number) => get<Team>(`team/view/${id}`),
    active: (req: TeamActiveRequest) => post<null>('team/active', req),
    create: (req: TeamCreateRequest) => post<null>('team/add', req),
    edit: (req: TeamEditRequest) => post<null>('team/edit', req),
    removeById: (id: number) => post<null>('team/remove', { id }),
  }
}

export default useTeamAPI
