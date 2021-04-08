import { ProcessStatus } from '@/lib/enums'
import {
  AffiliateProfit,
  AffiliateProfitListRequest,
  AffiliateProfitListResponse,
} from '@/types/api/AffiliateProfit'
import useRequest from '../useRequest'

function useAffiliateProfitAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: AffiliateProfitListRequest) =>
      post<AffiliateProfitListResponse>('promo_profit_rec/list', req),
    confirm: (id: number, status: ProcessStatus) =>
      post<null>('promo_profit_rec/confirm', { id, status }),
  }
}

export default useAffiliateProfitAPI
