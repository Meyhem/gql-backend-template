import { Connection, Repository } from 'typeorm'
import express from 'express'
import { Logger } from 'winston'

import { parseAuthorization } from './api/auth'
import { createDataLoaders } from './features/loaders'
import { Role, RoleName } from './entity/Role'
import { User } from './entity/User'
import { Post } from './entity/Post'

export interface Context {
  di: Injection
  auth: Auth
  logger: Logger
  loaders: ReturnType<typeof createDataLoaders>
}

export interface Injection {
  db: {
    users: Repository<User>
    roles: Repository<Role>
    posts: Repository<Post>
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
      roles: c.getRepository(Role),
      posts: c.getRepository(Post)
    }
  }
}

export function createContext(req: express.Request, c: Connection, logger: Logger) {
  try {
    const ctx: Context = {
      di: createInjection(c),
      auth: parseAuthorization(req.headers.authorization),
      logger,
      loaders: null
    }

    ctx.loaders = createDataLoaders(ctx)

    return ctx
  } catch (e) {
    logger.error(`createContext() ${e}`)
    throw e
  }
}
