import _ from 'lodash'

import { createResolver, FilterInput, prepareFilter } from '../../api/helpers'
import { mapToPostType, mapToUserType } from '../mappers'
import { PostType } from '../post/types'
import { UserType } from './types'

export const query = {
  users: createResolver<UserType[], unknown, FilterInput>(null, async ({ args, context }) => {
    var users = await context.di.db.users.find({ ...prepareFilter(args.filter), relations: ['role'] })
    return _.map(users, u => mapToUserType(u))
  })
}

export const postsOfUserResolver = createResolver<PostType[], UserType>(null, async ({ context, source }) => {
  const posts = await context.loaders.postsByUserId.load(source.id)

  return _.map(posts, mapToPostType)
})
