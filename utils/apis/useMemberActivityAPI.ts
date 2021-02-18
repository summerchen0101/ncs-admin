import {
  MemberActivity,
  MemberActivityListRequest,
  MemberActivityListResponse,
} from '@/types/api/MemberActivity'
import useRequest from '../useRequest'

function useMemberActivityAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberActivityListRequest) =>
      post<MemberActivityListResponse>('member/list', req),
  }
}

export default useMemberActivityAPI
