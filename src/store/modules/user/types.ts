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
  role?: string
  workDescribe?: string
  dormId?: string
  dormNumber?: string
  dormLocation?: string
  idCardNumber?: string
  number?: string
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined
