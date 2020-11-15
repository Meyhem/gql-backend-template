import { Connection, Repository } from 'typeorm'
import { Role } from './entity/Role'
import { User } from './entity/User'

export interface Context {
  di: Injection
}

export interface Injection {
  db: {
    users: Repository<User>
    roles: Repository<Role>
  }
}

export function createInjection(c: Connection): Injection {
  return {
    db: {
      users: c.getRepository(User),
      roles: c.getRepository(Role)
    }
  }
}

export function createContext(c: Connection) {
  const ctx: Context = {
    di: createInjection(c)
  }

  return ctx
}
