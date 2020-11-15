import { usersResolver } from '../features/user/query'

export const rootQuery = {
  users: usersResolver
}
