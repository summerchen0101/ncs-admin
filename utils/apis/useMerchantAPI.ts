import {
  Merchant,
  MerchantActiveRequest,
  MerchantApiKeyRequest,
  MerchantCreateRequest,
  MerchantEditRequest,
  MerchantListRequest,
  MerchantListResponse,
} from '@/types/api/Merchant'
import useRequest from '../useRequest'

function useMerchantAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MerchantListRequest) =>
      post<MerchantListResponse>('merchant/list', req),
    fetchById: (id: number) => get<Merchant>(`merchant/view/${id}`),
    active: (req: MerchantActiveRequest) => post<null>('merchant/active', req),
    create: (req: MerchantCreateRequest) => post<null>('merchant/add', req),
    edit: (req: MerchantEditRequest) => post<null>('merchant/edit', req),
    apiKey: (req: MerchantApiKeyRequest) => post<null>('merchant/api_key', req),
  }
}

export default useMerchantAPI
