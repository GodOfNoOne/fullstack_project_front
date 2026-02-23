import { Role } from './role.model'

export type Payload = {
  access_token: string
  username: string
  role: Role
}
