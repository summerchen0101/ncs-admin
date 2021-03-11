export interface MemberTag {
  id: number
  name: string
  content: string
  color: string
  member_count: number

  editor: string
  created_at: number
  updated_at: number
}

export interface MemberTagListRequest {
  name?: string
  page?: number
  perpage?: number
}

export interface MemberTagListResponse {
  list: MemberTag[]
  total_count: number
  total_page: number
}

export interface MemberTagActiveRequest {
  id: number
  is_active: boolean
}

export interface MemberTagCreateRequest {
  name: string
  color: string
  content: string
}
export interface MemberTagEditRequest {
  id: number
  name: string
  color: string
  content: string
}
