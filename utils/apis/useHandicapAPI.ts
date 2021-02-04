import {
  Handicap,
  HandicapActiveRequest,
  HandicapListRequest,
  HandicapListResponse,
} from '@/types/api/Handicap'
import useRequest from '../useRequest'

function useHandicapAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: HandicapListRequest) =>
      post<HandicapListResponse>('sport_handicap/list', req),
    fetchById: (id: number) => get<Handicap>(`sport_handicap/view/${id}`),
    active: (req: HandicapActiveRequest) =>
      post<null>('sport_handicap/active', req),
    autoAccounting: (req: HandicapActiveRequest) =>
      post<null>('sport_handicap/auto_accounting', req),
    openBet: (req: HandicapActiveRequest) =>
      post<null>('sport_handicap/open_bet', req),
  }
}

export default useHandicapAPI
