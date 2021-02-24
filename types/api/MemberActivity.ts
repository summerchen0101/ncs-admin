import { MemberType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
export interface MemberActivity {
  id: number
  acc: string
  name: string
}

export interface MemberActivityListRequest extends DateRangeListRequest {
  acc?: string
  agent_id?: number
}

export interface MemberActivityListResponse {
  list: MemberActivity[]
  total_count: number
  total_page: number
}
