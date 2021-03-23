import {
  TeamTranslate,
  TeamTranslateActiveRequest,
  TeamTranslateCreateRequest,
  TeamTranslateEditRequest,
  TeamTranslateListRequest,
  TeamTranslateListResponse,
} from '@/types/api/TeamTranslate'
import useRequest from '../useRequest'

function useTeamTranslateAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: TeamTranslateListRequest) =>
      post<TeamTranslateListResponse>('team_translate/list', req),
    fetchById: (id: number) => get<TeamTranslate>(`team_translate/view/${id}`),
    active: (req: TeamTranslateActiveRequest) =>
      post<null>('team_translate/active', req),
    create: (req: TeamTranslateCreateRequest) =>
      post<null>('team_translate/add', req),
    edit: (req: TeamTranslateEditRequest) =>
      post<null>('team_translate/edit', req),
    removeById: (id: number) => post<null>('team_translate/remove', { id }),
  }
}

export default useTeamTranslateAPI
