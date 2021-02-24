import {
  DefaultBet,
  DefaultBetActiveRequest,
  DefaultBetCreateRequest,
  DefaultBetEditRequest,
  DefaultBetListRequest,
  DefaultBetListResponse,
} from '@/types/api/DefaultBet'
import useRequest from '../useRequest'

function useDefaultBetAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: DefaultBetListRequest) =>
      post<DefaultBetListResponse>('handicap/list', req),
    fetchById: (id: number) => get<DefaultBet>(`handicap/view/${id}`),
    active: (req: DefaultBetActiveRequest) =>
      post<null>('handicap/active', req),
    create: (req: DefaultBetCreateRequest) => post<null>('handicap/add', req),
    edit: (req: DefaultBetEditRequest) => post<null>('handicap/edit', req),
    removeById: (id: number) => post<null>('handicap/remove', { id }),
  }
}

export default useDefaultBetAPI
