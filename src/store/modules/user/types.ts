export type RoleType = '' | '*' | 'user'
export interface UserState {
  account?: string
  avatar?: string
  email?: string
  id?: string
  lastLoginTime?: string
  mobile?: string
  name?: string
  sex?: string
  workDescribe?: string
  dormNumber?: string
  dormLocation?: string
  idCardNumber?: string
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined
