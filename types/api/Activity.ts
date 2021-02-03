import { ProcessStatus, Status } from '@/lib/enums'

export interface Activity {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number

  bonus: number
}

export interface ActivityListRequest {
  title?: string
  start_at?: number
  end_at?: number
  is_active?: Status
  process_status?: ProcessStatus
  page?: number
  perpage?: number
}

export interface ActivityListResponse {
  list: Activity[]
  total_count: number
  total_page: number
}

export interface ActivityActiveRequest {
  id: number
  is_active: boolean
}

export interface ActivityCreateRequest {
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  bonus: number
  is_active: boolean
  start_at: number
  end_at: number
}
export interface ActivityEditRequest {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  bonus: number
  is_active: boolean
  start_at: number
  end_at: number
}
