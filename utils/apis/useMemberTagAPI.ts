import {
  MemberTag,
  MemberTagCreateRequest,
  MemberTagEditRequest,
  MemberTagListRequest,
  MemberTagListResponse,
} from '@/types/api/MemberTag'
import useRequest from '../useRequest'

function useMemberTagAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberTagListRequest) =>
      post<MemberTagListResponse>('member_tag/list', req),
    fetchById: (id: number) => get<MemberTag>(`member_tag/view/${id}`),
    create: (req: MemberTagCreateRequest) => post<null>('member_tag/add', req),
    edit: (req: MemberTagEditRequest) => post<null>('member_tag/edit', req),
    removeById: (id: number) => post<null>('member_tag/remove', { id }),
  }
}

export default useMemberTagAPI
