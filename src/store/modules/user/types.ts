export type RoleType = '' | '*' | 'user'
export interface UserState {
  account?: string
  avatar?: string
  email?: string
  id?: string
  lastLoginTime?: string
  mobile?: string
  name?: string
  orgId?: string
  sex?: string
  stationId?: string
  status?: boolean
  token?: string
  workDescribe?: string
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined
