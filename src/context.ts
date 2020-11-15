import { Connection, Repository } from 'typeorm'
import express from 'express'

import { parseAuthorization } from './api/auth'
import { Role, RoleName } from './entity/Role'
import { User } from './entity/User'

export interface Context {
  di: Injection
  auth: Auth
}

export interface Injection {
  db: {
    users: Repository<User>
    roles: Repository<Role>
  }
}

export interface Auth {
  isAuthenticated: boolean
  id?: number
  role?: RoleName
}

export function createInjection(c: Connection): Injection {
  return {
    db: {
      users: c.getRepository(User),
      roles: c.getRepository(Role)
    }
  }
}

export function createContext(req: express.Request, c: Connection) {
  const ctx: Context = {
    di: createInjection(c),
    auth: parseAuthorization(req.headers.authorization)
  }

  return ctx
}
