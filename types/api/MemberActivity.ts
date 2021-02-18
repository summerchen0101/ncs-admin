import { MemberType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
export interface MemberActivity {
  id: number
  acc: string
  name: string
}

export interface MemberActivityListRequest extends DateRangeListRequest {
  member_type?: MemberType
}

export interface MemberActivityListResponse {
  list: MemberActivity[]
  total_count: number
  total_page: number
}
