import { BaseListRequest } from '..'
export interface CashflowMerchant {
  id: number
  sort: number
  name: string
  prefix: string
  merchant_id: string
  hash_key: string
  hash_iv: string
  base_url: string
  deposit_return_url: string
  withdraw_return_url: string
  withdraw_fee: number
  withdraw_fee_percent: number
  withdraw_limit_day: number
  withdraw_limit_week: number
  withdraw_limit_mon: number
  note: string
  sys_code: string
  group_code: string
  is_active: boolean
}

export interface CashflowMerchantListRequest extends BaseListRequest {
  name?: string
  sys_code?: string
  group_code?: string
}

export interface CashflowMerchantListResponse {
  list: CashflowMerchant[]
  total_count: number
  total_page: number
}

export interface CashflowMerchantActiveRequest {
  id: number
  is_active: boolean
}

export interface CashflowMerchantCreateRequest {
  sort: number
  name: string
  prefix: string
  merchant_id: string
  hash_key: string
  hash_iv: string
  base_url: string
  deposit_return_url: string
  withdraw_return_url: string
  withdraw_fee: number
  withdraw_fee_percent: number
  withdraw_limit_day: number
  withdraw_limit_week: number
  withdraw_limit_mon: number
  note: string
  sys_code: string
  group_code: string
  gateways: number[]
  is_active: boolean
}
export interface CashflowMerchantEditRequest {
  id: number
  sort: number
  name: string
  prefix: string
  merchant_id: string
  hash_key: string
  hash_iv: string
  base_url: string
  deposit_return_url: string
  withdraw_return_url: string
  withdraw_fee: number
  withdraw_fee_percent: number
  withdraw_limit_day: number
  withdraw_limit_week: number
  withdraw_limit_mon: number
  note: string
  sys_code: string
  group_code: string
  is_active: boolean
}
