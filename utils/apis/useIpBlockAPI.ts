import {
  IpBlock,
  IpBlockActiveRequest,
  IpBlockCreateRequest,
  IpBlockEditRequest,
  IpBlockListRequest,
  IpBlockListResponse,
} from '@/types/api/IpBlock'
import useRequest from '../useRequest'

function useIpBlockAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: IpBlockListRequest) =>
      post<IpBlockListResponse>('ip_block/list', req),
    fetchById: (id: number) => get<IpBlock>(`ip_block/view/${id}`),
    active: (req: IpBlockActiveRequest) => post<null>('ip_block/active', req),
    create: (req: IpBlockCreateRequest) => post<null>('ip_block/add', req),
    edit: (req: IpBlockEditRequest) => post<null>('ip_block/edit', req),
    removeById: (id: number) => post<null>('ip_block/remove', { id }),
  }
}

export default useIpBlockAPI
