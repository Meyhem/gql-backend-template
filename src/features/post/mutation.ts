import { createMutation } from '../../api/helpers'
import { mapToPostType } from '../mappers'
import { PostType } from './types'

export const mutation = {
  createPost: createMutation<PostType>(null, async () => {
    return mapToPostType({} as any)
  })
}
