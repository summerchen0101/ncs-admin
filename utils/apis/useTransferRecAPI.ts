import {
  TransferRecListRequest,
  TransferRecListResponse,
} from '@/types/api/TransferRec'
import useRequest from '../useRequest'

function useTransferRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: TransferRecListRequest) =>
      post<TransferRecListResponse>('transfer_rec/list', req),
  }
}

export default useTransferRecAPI
