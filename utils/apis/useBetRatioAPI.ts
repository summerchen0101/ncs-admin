import { BetRatioListRequest, BetRatioListResponse } from '@/types/api/BetRatio'
import useRequest from '../useRequest'

function useBetRatioAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: BetRatioListRequest) =>
      post<BetRatioListResponse>('bet_ratio/list', req),
  }
}

export default useBetRatioAPI
