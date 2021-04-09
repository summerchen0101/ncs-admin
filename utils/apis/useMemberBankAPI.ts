import {
  MemberBank,
  MemberBankActiveRequest,
  MemberBankListRequest,
  MemberBankListResponse,
} from '@/types/api/MemberBank'
import useRequest from '../useRequest'

function useMemberBankAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberBankListRequest) =>
      post<MemberBankListResponse>('member_bank/list', req),
    fetchById: (id: number) => get<MemberBank>(`member_bank/view/${id}`),
    confirm: (req: MemberBankActiveRequest) =>
      post<null>('member_bank/confirm', req),
    removeById: (id: number) => post<null>('member_bank/remove', { id }),
  }
}

export default useMemberBankAPI
