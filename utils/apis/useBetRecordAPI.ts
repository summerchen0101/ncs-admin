import {
  BetRecord,
  BetRecordListRequest,
  BetRecordListResponse,
} from '@/types/api/BetRecord'
import useRequest from '../useRequest'

function useBetRecordAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: BetRecordListRequest) =>
      post<BetRecordListResponse>('bet_rec/list', req),
  }
}

export default useBetRecordAPI
