import { MemberBasic } from '..'

export interface LoginRequest {
  acc: string
  pass: string
}

export interface LoginResponse {
  id: number
  acc: string
  name: string
  token: string
}

export interface CheckLoginResponse {
  member: MemberBasic
}
