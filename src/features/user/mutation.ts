import { randomBytes } from 'crypto'
import { sign } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'

import { config } from '../../config'
import { createMutation } from '../../api/helpers'
import { Input } from '../../api/helpers'
import { User } from '../../entity/User'
import { CreateUserInput, UserType } from './types'
import { hashPassword } from './utils'
import { mapToUserType } from '../mappers'

export const mutation = {
  createUser: createMutation<UserType, unknown, Input<CreateUserInput>>(
    async ({
      args,
      context: {
        di: { db }
      }
    }) => {
      const { username, firstname, lastname, password, role } = args.input

      const salt = randomBytes(128).toString('base64')
      const passwordHash = hashPassword(password, salt)
      const r = await db.roles.findOne({ name: role })

      const usr = new User()
      usr.username = username
      usr.passwordHash = passwordHash
      usr.salt = salt
      usr.isLocked = false
      usr.firstname = firstname
      usr.lastname = lastname
      usr.role = r

      await db.users.insert(usr)
      return mapToUserType(usr)
    }
  ),
  issueToken: createMutation<string, unknown, { username: string; password: string }>(async ({ args, context }) => {
    const { username, password } = args
    const u = await context.di.db.users.findOne({ where: { username: username }, relations: ['role'] })
    const credError = new AuthenticationError('Invalid username/password')

    if (!u) {
      throw credError
    }

    const passwordHash = hashPassword(password, u.salt)

    if (passwordHash != u.passwordHash) {
      throw credError
    }

    return sign({ id: u.id, role: u.role.name }, config.JWT_SECRET, { expiresIn: '1h' })
  })
}
