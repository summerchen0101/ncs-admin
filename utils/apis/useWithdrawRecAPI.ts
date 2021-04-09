import { ProcessStatus } from '@/lib/enums'
import {
  WithdrawRec,
  WithdrawRecListRequest,
  WithdrawRecListResponse,
  WithdrawReviewRequest,
} from '@/types/api/WithdrawRec'
import useRequest from '../useRequest'

function useWithdrawRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: WithdrawRecListRequest) =>
      post<WithdrawRecListResponse>('withdraw_rec/list', req),
    fetchById: (id: number) => get<WithdrawRec>(`withdraw_rec/view/${id}`),
    status: (req: WithdrawReviewRequest) =>
      post<null>('withdraw_rec/confirm', req),
  }
}

export default useWithdrawRecAPI
