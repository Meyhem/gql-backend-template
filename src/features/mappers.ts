import { fromStandardDate } from '../api/formatters'
import { Post } from '../entity/Post'
import { User } from '../entity/User'
import { PostType } from './post/types'
import { UserType } from './user/types'

export function mapToUserType(u: User): UserType {
  return {
    id: u.id,
    username: u.username,
    firstname: u.firstname,
    lastname: u.lastname,
    role: u.role.name,
    posts: null
  }
}

export function mapToPostType(o: Post): PostType {
  return {
    id: o.id,
    title: o.title,
    isPublished: o.isPublished,
    lastPublished: fromStandardDate(o.lastPublished),
    createdAt: fromStandardDate(o.createdAt),
    updatedAt: fromStandardDate(o.updatedAt),
    deletedAt: fromStandardDate(o.deletedAt)
  }
}
