import {
  WalletRecListRequest,
  WalletRecListResponse,
} from '@/types/api/WalletRec'
import useRequest from '../useRequest'

function useWalletRecAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: WalletRecListRequest) =>
      post<WalletRecListResponse>('wallet_rec/list', req),
  }
}

export default useWalletRecAPI
