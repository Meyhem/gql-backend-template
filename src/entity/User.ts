import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
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
  firstname: string

  @Column()
  lastname: string

  @Column()
  isLocked: boolean

  @ManyToOne(() => Role, r => r.users)
  role: Role
}
