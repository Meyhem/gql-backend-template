import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { Publishable, Trackable } from '../api/entity-helpers'
import { User } from './User'

@Entity()
export class Post implements Trackable, Publishable {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column({ nullable: true })
  deletedAt?: Date

  @Column()
  isPublished: boolean

  @Column({ nullable: true })
  lastPublished?: Date

  @ManyToOne(() => User, u => u.posts)
  @JoinColumn({ name: 'authorId' })
  author: User

  @Column()
  authorId: number
}
