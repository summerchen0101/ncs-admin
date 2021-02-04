import { Status } from '@/lib/enums'

export interface FaqCategory {
  id: number
  name: string
  sort: number
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface FaqCategoryListRequest {
  catalogue_id?: number
  is_active?: Status
  page?: number
  perpage?: number
}

export interface FaqCategoryListResponse {
  list: FaqCategory[]
  total_count: number
  total_page: number
}

export interface FaqCategoryActiveRequest {
  id: number
  is_active: boolean
}

export interface FaqCategoryCreateRequest {
  name: string
  sort: number
  is_active: boolean
}
export interface FaqCategoryEditRequest {
  id: number
  name: string
  sort: number
  is_active: boolean
}
