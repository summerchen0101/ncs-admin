import {
  Member,
  MemberActiveRequest,
  MemberBetSettingListResponse,
  MemberCreateRequest,
  MemberEditRequest,
  MemberListRequest,
  MemberListResponse,
  MemberStatusRequest,
} from '@/types/api/Member'
import useRequest from '../useRequest'

function useMemberAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: MemberListRequest) =>
      post<MemberListResponse>('member/list', req),
    fetchById: (id: number) => get<Member>(`member/view/${id}`),
    active: (req: MemberActiveRequest) => post<null>('member/active', req),
    openBet: (req: MemberActiveRequest) => post<null>('member/open_bet', req),
    status: (req: MemberStatusRequest) => post<null>('member/status', req),
    create: (req: MemberCreateRequest) => post<null>('member/add', req),
    edit: (req: MemberEditRequest) => post<null>('member/edit', req),
    removeById: (id: number) => post<null>('member/remove', { id }),
    pass: (id: number, pass: string) => post<null>('member/pass', { id, pass }),
    tradePass: (id: number, pass: string) =>
      post<null>('member/sec_pass', { id, pass }),
    fetchBetSetting: (id: number) =>
      post<MemberBetSettingListResponse>('bet_setting/list', { id }),
  }
}

export default useMemberAPI
