import { MemberBasic } from '..'

export interface LoginRequest {
  acc: string
  pass: string
  code: string
  token: string
}

export interface LoginResponse {
  id: number
  acc: string
  name: string
  token: string
}

export interface CheckLoginResponse {
  user: MemberBasic
}

export interface CaptchaResponse {
  img: string
  token: string
}
