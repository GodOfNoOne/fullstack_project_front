import { AppType } from './app-type.model'
import { AppStatus } from './appStatus.model'

export interface ApplicationFrom {
  appId: number
  timeOfSubmition: Date
  forUser: string
  fromUser: string
  appType: AppType
  adminVotes: string[]
  appStatus: AppStatus
}
