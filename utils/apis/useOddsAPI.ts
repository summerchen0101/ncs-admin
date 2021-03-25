import {
  Odds,
  OddsActiveRequest,
  OddsCreateRequest,
  OddsCtrlRequest,
  OddsCtrlResponse,
  OddsEditRequest,
  OddsListRequest,
  OddsListResponse,
} from '@/types/api/Odds'
import useRequest from '../useRequest'

function useOddsAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: OddsListRequest) =>
      post<OddsListResponse>('odds/list', req),
    fetchById: (id: number) => get<Odds>(`odds/view/${id}`),
    active: (req: OddsActiveRequest) => post<null>('odds/active', req),
    openBet: (req: OddsActiveRequest) => post<null>('odds/open_bet', req),
    autoOdds: (req: OddsActiveRequest) => post<null>('odds/auto_odds', req),
    create: (req: OddsCreateRequest) => post<null>('odds/add', req),
    liveEdit: (req: OddsEditRequest) => post<null>('odds/edit', req),
    defaultEdit: (req: OddsEditRequest) => post<null>('odds/default_edit', req),
    control: (req: OddsCtrlRequest) =>
      post<OddsCtrlResponse>('odds/control', req),
    removeById: (id: number) => post<null>('odds/remove', { id }),
  }
}

export default useOddsAPI
