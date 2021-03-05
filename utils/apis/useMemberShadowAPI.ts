import {
  MemberShadow,
  SubAccActiveRequest,
  SubAccCreateRequest,
  SubAccEditRequest,
  SubAccListRequest,
  SubAccListResponse,
  SubAccStatusRequest,
} from '@/types/api/MemberShadow'
import useRequest from '../useRequest'

function useSubAccAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: SubAccListRequest) =>
      post<SubAccListResponse>('member_shadow/list', req),
    fetchById: (id: number) => get<MemberShadow>(`member_shadow/view/${id}`),
    status: (req: SubAccStatusRequest) =>
      post<null>('member_shadow/status', req),
    active: (req: SubAccActiveRequest) =>
      post<null>('member_shadow/active', req),
    create: (req: SubAccCreateRequest) => post<null>('member_shadow/add', req),
    edit: (req: SubAccEditRequest) => post<null>('member_shadow/edit', req),
    removeById: (id: number) => post<null>('member_shadow/remove', { id }),
    pass: (id: number, pass: string) =>
      post<null>('member_shadow/pass', { id, pass }),
  }
}

export default useSubAccAPI
