import { BaseListRequest } from '..'
export interface DefaultBet {
  id: number
  game_code: string

  editor: string
  created_at: number
  updated_at: number
}

export interface DefaultBetListRequest extends BaseListRequest {
  game_code?: string
  section_code?: string
  play_code?: string
}

export interface DefaultBetListResponse {
  list: DefaultBet[]
  total_count: number
  total_page: number
}

export interface DefaultBetActiveRequest {
  id: number
  is_active: boolean
}

export interface DefaultBetCreateRequest {
  game_code: string
}
export interface DefaultBetEditRequest {
  id: number
  game_code: string
}
