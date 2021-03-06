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
      post<RealNameListResponse>('member_bank/list', req),
    fetchById: (id: number) => get<RealName>(`member_bank/view/${id}`),
    confirm: (req: RealNameActiveRequest) =>
      post<null>('member_bank/confirm', req),
  }
}

export default useRealNameAPI
