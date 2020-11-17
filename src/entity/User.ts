import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm'
import { Post } from './Post'
import { Role } from './Role'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  passwordHash: string

  @Column()
  salt: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  isLocked: boolean

  @ManyToOne(() => Role, r => r.users)
  role: Role

  @OneToMany(() => Post, p => p.author)
  posts: Post[]
}
