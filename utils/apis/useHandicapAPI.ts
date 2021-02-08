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
      post<HandicapListResponse>('handicap/list', req),
    fetchById: (id: number) => get<Handicap>(`handicap/view/${id}`),
    active: (req: HandicapActiveRequest) => post<null>('handicap/active', req),
    autoAccounting: (req: HandicapActiveRequest) =>
      post<null>('handicap/auto_accounting', req),
    openBet: (req: HandicapActiveRequest) =>
      post<null>('handicap/open_bet', req),
  }
}

export default useHandicapAPI
