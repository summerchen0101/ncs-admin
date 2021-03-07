import {
  Member,
  MemberActiveRequest,
  BetSettingListResponse,
  MemberCreateRequest,
  MemberEditRequest,
  MemberListRequest,
  MemberListResponse,
  MemberStatusRequest,
  BetSettingEditRequest,
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
    realName: (req: MemberActiveRequest) => post<null>('member/real_name', req),
    promo: (req: MemberActiveRequest) => post<null>('member/promo', req),
    credit: (id: number, credit: number) =>
      post<null>('member/credit', { id, credit }),
    create: (req: MemberCreateRequest) => post<null>('member/add', req),
    edit: (req: MemberEditRequest) => post<null>('member/edit', req),
    removeById: (id: number) => post<null>('member/remove', { id }),
    pass: (id: number, pass: string) => post<null>('member/pass', { id, pass }),
    tradePass: (id: number, pass: string) =>
      post<null>('member/sec_pass', { id, pass }),
    fetchBetSetting: (id: number) =>
      post<BetSettingListResponse>('bet_setting/list', { id }),
    editBetSetting: (req: BetSettingEditRequest) =>
      post<null>('bet_setting/edit', req),
  }
}

export default useMemberAPI
