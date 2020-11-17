import { fromStandardDate } from '../../api/formatters'
import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export interface PostType {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  isPublished: boolean
  lastPublished?: string
  author?: User
}
