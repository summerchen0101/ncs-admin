import {
  Handicap,
  HandicapActiveRequest,
  HandicapCreateRequest,
  HandicapListRequest,
  HandicapListResponse,
  HandicapResultRequest,
} from '@/types/api/Handicap'
import useRequest from '../useRequest'

function useHandicapAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: HandicapListRequest) =>
      post<HandicapListResponse>('handicap/list', req),
    create: (req: HandicapCreateRequest) => post<null>('handicap/add', req),
    active: (req: HandicapActiveRequest) => post<null>('handicap/active', req),
    autoAccounting: (req: HandicapActiveRequest) =>
      post<null>('handicap/auto_accounting', req),
    openBet: (req: HandicapActiveRequest) =>
      post<null>('handicap/open_bet', req),
    result: (req: HandicapResultRequest) => post<null>('handicap/result', req),
  }
}

export default useHandicapAPI
