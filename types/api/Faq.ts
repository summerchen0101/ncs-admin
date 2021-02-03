import { Status } from '@/lib/enums'

export interface Faq {
  id: number
  catalogue: {
    id: number
    name: string
  }
  title: string
  content: string
  content_mobile: string
  is_active: boolean
  created_at: number
  updated_at: number
}

export interface FaqListRequest {
  catalogue_id?: number
  is_active?: Status
  page?: number
  perpage?: number
}

export interface FaqListResponse {
  list: Faq[]
  total_count: number
  total_page: number
}

export interface FaqActiveRequest {
  id: number
  is_active: boolean
}

export interface FaqCreateRequest {
  catalogue_id: number
  title: string
  content: string
  content_mobile: string
  is_active: boolean
}
export interface FaqEditRequest {
  id: number
  catalogue_id: number
  title: string
  content: string
  content_mobile: string
  is_active: boolean
}
