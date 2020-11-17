import _ from 'lodash'
import { In } from 'typeorm'
import { createLoader } from '../api/helpers'
import { Context } from '../context'
import { Post } from '../entity/Post'

export function createDataLoaders(ctx: Context) {
  return {
    postsByUserId: createLoader<Post[]>(async ids => {
      const posts = await ctx.di.db.posts.find({ where: { authorId: In(ids as number[]) } })
      return _.map(ids, id => _.filter(posts, p => p.authorId == id))
    })
  }
}
