import {
  CashflowMerchant,
  CashflowMerchantActiveRequest,
  CashflowMerchantCreateRequest,
  CashflowMerchantEditRequest,
  CashflowMerchantListRequest,
  CashflowMerchantListResponse,
} from '@/types/api/CashflowMerchant'
import useRequest from '../useRequest'

function useCashflowMerchantAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CashflowMerchantListRequest) =>
      post<CashflowMerchantListResponse>('payment_merchant/list', req),
    fetchById: (id: number) =>
      get<CashflowMerchant>(`payment_merchant/view/${id}`),
    active: (req: CashflowMerchantActiveRequest) =>
      post<null>('payment_merchant/active', req),
    create: (req: CashflowMerchantCreateRequest) =>
      post<null>('payment_merchant/add', req),
    edit: (req: CashflowMerchantEditRequest) =>
      post<null>('payment_merchant/edit', req),
    removeById: (id: number) => post<null>('payment_merchant/remove', { id }),
  }
}

export default useCashflowMerchantAPI
