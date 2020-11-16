import _ from 'lodash'

import { createResolver } from '../../api/helpers'
import { mapToUserType, UserType } from './types'

export const users = createResolver<UserType[]>(async ({ context }) => {
  var users = await context.di.db.users.find({ relations: ['role'] })
  return _.map(users, u => mapToUserType(u))
})
