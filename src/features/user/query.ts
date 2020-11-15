import { createResolver } from '../../api/helpers'
import { UserType } from './types'

export const usersResolver = createResolver<UserType[]>(() => {
  return [{ username: 'kokot' }]
})
