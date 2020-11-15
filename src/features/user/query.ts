import _ from 'lodash'

import { createResolver } from '../../api/helpers'
import { mapToUserType, UserType } from './types'

export const usersResolver = createResolver<UserType[]>(async ({ context }) => {
  var users = await context.di.db.users.find({ relations: ['role'] })
  console.log(context.auth)
  return _.map(users, u => mapToUserType(u))
})
