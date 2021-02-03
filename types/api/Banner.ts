import { Status } from '@/lib/enums'

export interface Banner {
  id: number
  title: string
  url: string
  img: string
  img_mobile: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number

  editor: string
  created_at: number
  updated_at: number
}

export interface BannerListRequest {
  title: string
  start_at: number
  end_at: number
  is_active: Status
  page?: number
  perpage?: number
}

export interface BannerListResponse {
  list: Banner[]
  total_count: number
  total_page: number
}

export interface BannerActiveRequest {
  id: number
  is_active: boolean
}

export interface BannerCreateRequest {
  title: string
  url: string
  img: string
  img_mobile: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
export interface BannerEditRequest {
  id: number
  title: string
  url: string
  img: string
  img_mobile: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
