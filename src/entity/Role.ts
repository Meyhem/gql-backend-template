import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

export type RoleName = 'Admin' | 'Editor' | 'Guest'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: RoleName

  @OneToMany(() => User, u => u.role)
  users: User
}
