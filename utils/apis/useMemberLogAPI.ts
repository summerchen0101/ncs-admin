import {
  MemberLog,
  MemberLogListRequest,
  MemberLogListResponse,
  MemberLogRemoveAllRequest,
} from '@/types/api/MemberLog'
import useRequest from '../useRequest'

function useMemberLogAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberLogListRequest) =>
      post<MemberLogListResponse>('member_log/list', req),
    fetchById: (id: number) => get<MemberLog>(`member_log/view/${id}`),
    removeById: (id: number) => post<null>('member_log/remove', { id }),
    removeAll: (req: MemberLogRemoveAllRequest) =>
      post<null>('member_log/remove_all', req),
  }
}

export default useMemberLogAPI
