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

export type DateRangeListRequest = BaseListRequest & {
  start_at?: number
  end_at?: number
}

export interface Pagination {
  total_count: number
  total_page: number
}

export interface MemberBasic {
  acc: string
  id: number
  name: string
}

export interface OptionBasic {
  id: number
  name: string
}

export interface OptionType<T = number> {
  label: string
  value: T
}

export type DateTypes = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek'
