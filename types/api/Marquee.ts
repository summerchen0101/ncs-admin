import { Status } from '@chakra-ui/react'

export interface Marquee {
  id: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number

  editor: string
  created_at: number
  updated_at: number
}

export interface MarqueeListRequest {
  content?: string
  start_at?: number
  end_at?: number
  is_active?: Status
  page?: number
  perpage?: number
}

export interface MarqueeListResponse {
  list: Marquee[]
  total_count: number
  total_page: number
}

export interface MarqueeActiveRequest {
  id: number
  is_active: boolean
}

export interface MarqueeCreateRequest {
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
export interface MarqueeEditRequest {
  id: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
