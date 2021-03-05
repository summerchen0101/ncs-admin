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
      post<SubAccListResponse>('admin_user/list', req),
    fetchById: (id: number) => get<MemberShadow>(`admin_user/view/${id}`),
    status: (req: SubAccStatusRequest) => post<null>('admin_user/status', req),
    active: (req: SubAccActiveRequest) => post<null>('admin_user/active', req),
    create: (req: SubAccCreateRequest) => post<null>('admin_user/add', req),
    edit: (req: SubAccEditRequest) => post<null>('admin_user/edit', req),
    removeById: (id: number) => post<null>('admin_user/remove', { id }),
    pass: (id: number, pass: string) =>
      post<null>('admin_user/pass', { id, pass }),
  }
}

export default useSubAccAPI
