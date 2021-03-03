import { ProcessStatus } from '@/lib/enums'
import {
  WithdrawRec,
  WithdrawRecListRequest,
  WithdrawRecListResponse,
} from '@/types/api/WithdrawRec'
import useRequest from '../useRequest'

function useWithdrawRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: WithdrawRecListRequest) =>
      post<WithdrawRecListResponse>('activity_rec/list', req),
    fetchById: (id: number) => get<WithdrawRec>(`activity_rec/view/${id}`),
    status: (id: number, status: ProcessStatus) =>
      post<null>('activity_rec/status', { id, status }),
  }
}

export default useWithdrawRecAPI
