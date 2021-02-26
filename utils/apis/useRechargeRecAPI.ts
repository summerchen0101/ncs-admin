import {
  RechargeRec,
  RechargeRecCreateRequest,
  RechargeRecListRequest,
  RechargeRecListResponse,
} from '@/types/api/RechargeRec'
import useRequest from '../useRequest'

function useRechargeRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: RechargeRecListRequest) =>
      post<RechargeRecListResponse>('recharge_rec/list', req),
    create: (req: RechargeRecCreateRequest) =>
      post<null>('recharge_rec/add', req),
  }
}

export default useRechargeRecAPI
