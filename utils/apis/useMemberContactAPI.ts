import {
  MemberContact,
  MemberContactActiveRequest,
  MemberContactListRequest,
  MemberContactListResponse,
} from '@/types/api/MemberContact'
import useRequest from '../useRequest'

function useMemberContactAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberContactListRequest) =>
      post<MemberContactListResponse>('member_contact/list', req),
    fetchById: (id: number) => get<MemberContact>(`member_contact/view/${id}`),
    confirm: (req: MemberContactActiveRequest) =>
      post<null>('member_contact/confirm', req),
  }
}

export default useMemberContactAPI
