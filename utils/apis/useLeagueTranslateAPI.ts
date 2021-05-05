import {
  LeagueTranslate,
  LeagueTranslateActiveRequest,
  LeagueTranslateCreateRequest,
  LeagueTranslateEditRequest,
  LeagueTranslateListRequest,
  LeagueTranslateListResponse,
} from '@/types/api/LeagueTranslate'
import useRequest from '../useRequest'

function useLeagueTranslateAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: LeagueTranslateListRequest) =>
      post<LeagueTranslateListResponse>('league_translate/list', req),
    fetchById: (id: number) =>
      get<LeagueTranslate>(`league_translate/view/${id}`),
    active: (req: LeagueTranslateActiveRequest) =>
      post<null>('league_translate/active', req),
    create: (req: LeagueTranslateCreateRequest) =>
      post<null>('league_translate/add', req),
    edit: (req: LeagueTranslateEditRequest) =>
      post<null>('league_translate/edit', req),
    removeById: (id: number) => post<null>('league_translate/remove', { id }),
  }
}

export default useLeagueTranslateAPI
