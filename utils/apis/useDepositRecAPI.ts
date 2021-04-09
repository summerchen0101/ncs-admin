import {
  DepositRecListRequest,
  DepositRecListResponse,
} from '@/types/api/DepositRec'
import useRequest from '../useRequest'

function useDepositRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: DepositRecListRequest) =>
      post<DepositRecListResponse>('deposit_rec/list', req),
  }
}

export default useDepositRecAPI
