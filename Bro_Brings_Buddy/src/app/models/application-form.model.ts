import { AppType } from './app-type.model'

export interface ApplicationFrom {
  appId: number
  appType: AppType
  fromUser: string
  forUser: string
  adminVotes: string[]
}
