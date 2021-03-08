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
      post<RealNameListResponse>('member_contact/list', req),
    fetchById: (id: number) => get<RealName>(`member_contact/view/${id}`),
    confirm: (req: RealNameActiveRequest) =>
      post<null>('member_contact/confirm', req),
  }
}

export default useRealNameAPI
