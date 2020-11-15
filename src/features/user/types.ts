import { RoleName } from '../../entity/Role'

export interface UserType {
  username: string
}

export interface CreateUserInput {
  username: string
  role: RoleName
}
