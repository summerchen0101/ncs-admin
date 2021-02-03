import { MemberType } from '@/lib/enums'

export interface Message {
  content: string
  created_at: number
  id: number
  is_all: boolean
  member_type: number
  read_count: number
  receiver_accs: string[]
  sender: string
  title: string
  updated_at: number
}

export interface MessageListRequest {
  title?: string
  member_type: MemberType
  page?: number
  perpage?: number
}

export interface MessageListResponse {
  list: Message[]
  total_count: number
  total_page: number
}

export interface MessageCreateRequest {
  title: string
  content: string
  receivers: string[]
  member_type: MemberType
}
