import { Status } from '@/lib/enums'
import { BaseListRequest } from '..'

export type MerchantAllowIpType = {
  id: number
  ip: string
}
export interface Merchant {
  id: number
  agent_id: number
  name: string
  prefix: string
  domain: string
  biz_email: string
  biz_telegram: string
  finance_email: string
  finance_telegram: string
  tech_email: string
  tech_telegram: string
  is_active: boolean
  allow_ips: MerchantAllowIpType[]
  api_key: string
  created_at: number
  editor: string
  updated_at: number
}

export interface MerchantListRequest extends BaseListRequest {}

export interface MerchantListResponse {
  list: Merchant[]
  total_count: number
  total_page: number
}

export interface MerchantActiveRequest {
  id: number
  is_active: boolean
}

export interface MerchantCreateRequest {
  acc: string
  pass: string
  name: string
  prefix: string
  domain: string
  biz_email: string
  biz_telegram: string
  finance_email: string
  finance_telegram: string
  tech_email: string
  tech_telegram: string
  is_active: boolean
}
export interface MerchantEditRequest {
  id: number
  name: string
  domain: string
  biz_email: string
  biz_telegram: string
  finance_email: string
  finance_telegram: string
  tech_email: string
  tech_telegram: string
  is_active: boolean
}
