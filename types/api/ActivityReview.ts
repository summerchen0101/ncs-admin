import { ProcessStatus } from '@/lib/enums'
import { MemberBasic } from '..'

export interface ActivityReview {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  is_active: boolean
  member: MemberBasic

  editor: string
  created_at: number
  updated_at: number

  bonus: number
}

export interface ActivityReviewListRequest {
  title?: string
  // start_at?: number
  // end_at?: number
  status?: ProcessStatus
  page?: number
  perpage?: number
}

export interface ActivityReviewListResponse {
  list: ActivityReview[]
  total_count: number
  total_page: number
}
