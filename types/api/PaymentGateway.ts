import { PaymentType } from '@/lib/enums'
import { BaseListRequest } from '..'
export interface PaymentGateway {
  id?: number
  merchant_id: number
  single_deposit_least: number
  single_deposit_limit: number
  deposit_fee: number
  deposit_fee_percent: number
  deposit_limit_day: number
  deposit_limit_week: number
  deposit_limit_mon: number
  is_active: boolean
  payment_type: PaymentType
}

export interface PaymentGatewayListRequest extends BaseListRequest {
  id?: number
}

export interface PaymentGatewayListResponse {
  list: PaymentGateway[]
  total_count: number
  total_page: number
}

export interface PaymentGatewayActiveRequest {
  id: number
  is_active: boolean
}

export interface PaymentGatewayCreateRequest {
  merchant_id: number
  single_deposit_least: number
  single_deposit_limit: number
  deposit_fee: number
  deposit_fee_percent: number
  deposit_limit_day: number
  deposit_limit_week: number
  deposit_limit_mon: number
  is_active: boolean
  payment_type: PaymentType
}
export interface PaymentGatewayEditRequest {
  id: number
  merchant_id: number
  single_deposit_least: number
  single_deposit_limit: number
  deposit_fee: number
  deposit_fee_percent: number
  deposit_limit_day: number
  deposit_limit_week: number
  deposit_limit_mon: number
  is_active: boolean
  payment_type: PaymentType
}
