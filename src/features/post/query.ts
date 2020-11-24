import _ from 'lodash'
import { createResolver } from '../../api/helpers'
import { mapToPostType } from '../mappers'
import { PostType } from './types'

export const query = {
  posts: createResolver<PostType[]>(null, async ({ context }) => {
    const posts = await context.di.db.posts.find()
    return _.map(posts, mapToPostType)
  })
}
