import { RoleName } from '../../entity/Role'
import { User } from '../../entity/User'

export interface UserType {
  id: number
  username: string
  firstname: string
  lastname: string
  role: RoleName
}

export interface CreateUserInput {
  username: string
  firstname: string
  lastname: string
  password: string
  role: RoleName
}

export function mapToUserType(u: User): UserType {
  return {
    id: u.id,
    username: u.username,
    firstname: u.firstname,
    lastname: u.lastname,
    role: u.role.name
  }
}
