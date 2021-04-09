import {
  PaymentGateway,
  PaymentGatewayActiveRequest,
  PaymentGatewayCreateRequest,
  PaymentGatewayEditRequest,
  PaymentGatewayListRequest,
  PaymentGatewayListResponse,
} from '@/types/api/PaymentGateway'
import useRequest from '../useRequest'

function usePaymentGatewayAPI() {
  const { get, post } = useRequest()

  return {
    fetchAll: (req: PaymentGatewayListRequest) =>
      post<PaymentGatewayListResponse>('payment_gateway/list', req),
    fetchById: (id: number) =>
      get<PaymentGateway>(`payment_gateway/view/${id}`),
    active: (req: PaymentGatewayActiveRequest) =>
      post<null>('payment_gateway/active', req),
    create: (req: PaymentGatewayCreateRequest) =>
      post<null>('payment_gateway/add', req),
    edit: (req: PaymentGatewayEditRequest) =>
      post<null>('payment_gateway/edit', req),
    removeById: (id: number) => post<null>('payment_gateway/remove', { id }),
  }
}

export default usePaymentGatewayAPI
