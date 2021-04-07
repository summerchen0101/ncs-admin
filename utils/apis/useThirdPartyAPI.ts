import {
  ThirdParty,
  ThirdPartyActiveRequest,
  ThirdPartyCreateRequest,
  ThirdPartyEditRequest,
  ThirdPartyListRequest,
  ThirdPartyListResponse,
} from '@/types/api/ThirdParty'
import useRequest from '../useRequest'

function useThirdPartyAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: ThirdPartyListRequest) =>
      post<ThirdPartyListResponse>('payment_system/list', req),
    fetchById: (id: number) => get<ThirdParty>(`payment_system/view/${id}`),
    active: (req: ThirdPartyActiveRequest) =>
      post<null>('payment_system/active', req),
    create: (req: ThirdPartyCreateRequest) =>
      post<null>('payment_system/add', req),
    edit: (req: ThirdPartyEditRequest) =>
      post<null>('payment_system/edit', req),
    removeById: (id: number) => post<null>('payment_system/remove', { id }),
  }
}

export default useThirdPartyAPI
