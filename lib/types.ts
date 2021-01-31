export interface Option<T> {
  label: string
  value: T
}
export type OptionsType<T> = Option<T>[]

export class ResponseBase<T> {
  code: number
  data: T
}

export class BaseListResponse<T> {
  list: T[]
  total_count: number
  total_page: number
}

export interface BaseListRequest {
  page?: number
  perpage?: number
}

export interface DateRangeRequest {
  start_at: number
  end_at: number
}

export type DateRangeListRequest = BaseListRequest & DateRangeRequest

export interface OptionType {
  label: string
  value: string | number
}

export interface LoginFormData {
  account: string
  password: string
}

export interface MenuItem {
  id: number
  name: string
  permission?: any
  parent?: number
  children?: MenuItem[]
}

export interface RemotePagination {
  total_count: number
  total_page: number
}

export interface MemberBasic {
  acc: string
  id: number
  name: string
}
