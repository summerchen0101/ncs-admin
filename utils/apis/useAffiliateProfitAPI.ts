import { ReviewStatus } from '@/lib/enums'
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
    status: (id: number, status: ReviewStatus) =>
      post<null>('activity_rec/status', { id, status }),
  }
}

export default useAffiliateProfitAPI
