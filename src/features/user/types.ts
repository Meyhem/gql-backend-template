import { RoleName } from '../../entity/Role'
import { PostType } from '../post/types'

export interface UserType {
  id: number
  username: string
  firstname: string
  lastname: string
  role: RoleName
  posts: PostType[]
}

export interface CreateUserInput {
  username: string
  firstname: string
  lastname: string
  password: string
  role: RoleName
}
