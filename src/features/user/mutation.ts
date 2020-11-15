import { createMutation } from '../../api/helpers'
import { Input } from '../../api/helpers'
import { User } from '../../entity/User'
import { CreateUserInput, UserType } from './types'

export const createUser = createMutation<UserType, unknown, Input<CreateUserInput>>(
  async ({
    args,
    context: {
      di: { db }
    }
  }) => {
    const { username, role } = args.input

    const r = await db.roles.findOne({ name: role })

    const usr = new User()
    usr.username = username
    usr.passwordHash = '123'
    usr.isLocked = false
    usr.firstname = 'User 1'
    usr.lastname = 'User 1'
    usr.role = r

    await db.users.insert(usr)
    return usr
  }
)
