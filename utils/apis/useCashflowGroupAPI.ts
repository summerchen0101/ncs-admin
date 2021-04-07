import {
  CashflowGroup,
  CashflowGroupActiveRequest,
  CashflowGroupCreateRequest,
  CashflowGroupEditRequest,
  CashflowGroupListRequest,
  CashflowGroupListResponse,
} from '@/types/api/CashflowGroup'
import useRequest from '../useRequest'

function useCashflowGroupAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CashflowGroupListRequest) =>
      post<CashflowGroupListResponse>('payment_group/list', req),
    fetchById: (id: number) => get<CashflowGroup>(`payment_group/view/${id}`),
    active: (req: CashflowGroupActiveRequest) =>
      post<null>('payment_group/active', req),
    create: (req: CashflowGroupCreateRequest) =>
      post<null>('payment_group/add', req),
    edit: (req: CashflowGroupEditRequest) =>
      post<null>('payment_group/edit', req),
    removeById: (id: number) => post<null>('payment_group/remove', { id }),
  }
}

export default useCashflowGroupAPI
