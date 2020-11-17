import _ from 'lodash'

import { createResolver } from '../../api/helpers'
import { mapToPostType, mapToUserType } from '../mappers'
import { PostType } from '../post/types'
import { UserType } from './types'

export const query = {
  users: createResolver<UserType[]>(async ({ context }) => {
    var users = await context.di.db.users.find({ relations: ['role'] })
    return _.map(users, u => mapToUserType(u))
  })
}

export const postsOfUserResolver = createResolver<PostType[], UserType>(async ({ context, source }) => {
  const posts = await context.loaders.postsByUserId.load(source.id)

  return _.map(posts, mapToPostType)
})
