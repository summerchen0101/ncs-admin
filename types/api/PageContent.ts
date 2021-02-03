import { Status } from '@/lib/enums'

export interface PageContent {
  id: number
  title: string
  code: string
  content: string
  content_mobile: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface PageContentListRequest {
  page?: number
  perpage?: number
}

export interface PageContentListResponse {
  list: PageContent[]
  total_count: number
  total_page: number
}

export interface PageContentActiveRequest {
  id: number
  is_active: boolean
}

export interface PageContentCreateRequest {
  title: string
  code: string
  content: string
  content_mobile: string
  is_active: boolean
}
export interface PageContentEditRequest {
  id: number
  title: string
  code: string
  content: string
  content_mobile: string
  is_active: boolean
}
