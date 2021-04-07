import {
  CashflowPkg,
  CashflowPkgActiveRequest,
  CashflowPkgCreateRequest,
  CashflowPkgEditRequest,
  CashflowPkgListRequest,
  CashflowPkgListResponse,
} from '@/types/api/CashflowPkg'
import useRequest from '../useRequest'

function useCashflowPkgAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: CashflowPkgListRequest) =>
      post<CashflowPkgListResponse>('payment_system/list', req),
    fetchById: (id: number) => get<CashflowPkg>(`payment_system/view/${id}`),
    active: (req: CashflowPkgActiveRequest) =>
      post<null>('payment_system/active', req),
    create: (req: CashflowPkgCreateRequest) =>
      post<null>('payment_system/add', req),
    edit: (req: CashflowPkgEditRequest) =>
      post<null>('payment_system/edit', req),
    removeById: (id: number) => post<null>('payment_system/remove', { id }),
  }
}

export default useCashflowPkgAPI
