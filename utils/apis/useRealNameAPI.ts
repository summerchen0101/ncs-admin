import {
  RealName,
  RealNameActiveRequest,
  RealNameListRequest,
  RealNameListResponse,
} from '@/types/api/RealName'
import useRequest from '../useRequest'

function useRealNameAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: RealNameListRequest) =>
      post<RealNameListResponse>('member_identity/list', req),
    fetchById: (id: number) => get<RealName>(`member_identity/view/${id}`),
    confirm: (req: RealNameActiveRequest) =>
      post<null>('member_identity/confirm', req),
    removeById: (id: number) => post<null>('member_identity/remove', { id }),
  }
}

export default useRealNameAPI
