import { AuthenticationError, ForbiddenError, ValidationError } from 'apollo-server'
import DataLoader from 'dataloader'
import _ from 'lodash'

import { Context } from '../context'
import { RoleName } from '../entity/Role'

export interface Input<T> {
  input: T
}

export interface FilterInput {
  filter: ListFilter
}

export type OrderDirection = 'ASC' | 'DESC'

export interface OrderEntry {
  name: string
  dir: OrderDirection
}

export interface ListFilter {
  skip: number
  take: number
  orderBy?: OrderEntry[]
}

export type ResolverConfig<TSource, TArgs> = {
  source: TSource
  args: TArgs
  context: Context
}
export type Resolver<TRet, TSource, TArgs> = (cfg: ResolverConfig<TSource, TArgs>) => TRet | Promise<TRet>

export function prepareFilter(f: ListFilter) {
  if (f.take < 1 || f.take > 50) {
    throw new ValidationError(`'take' must be between 1 to 50`)
  }

  return {
    skip: f.skip,
    take: Math.max(Math.min(50, f.take), 1),
    order: _.reduce(f.orderBy, (acc, e) => ({ ...acc, [e.name]: e.dir }), {})
  }
}

function authorize(ctx: Context, roles: RoleName[]) {
  const auth = ctx.auth
  if (!auth.isAuthenticated) {
    throw new AuthenticationError('User is not authenticated')
  }

  if (!auth.role) {
    throw new AuthenticationError('User has no role')
  }

  if (!_.includes(roles, auth.role)) {
    throw new AuthenticationError(`Action is not permitted for users with role ${auth.role}`)
  }
}

export function createResolver<TRet, TSource = unknown, TArgs = unknown>(
  roles: RoleName[],
  resolver: Resolver<TRet, TSource, TArgs>
) {
  return async (source: TSource, args: TArgs, context: Context) => {
    if (!_.isNil(roles) && !_.isEmpty(roles)) {
      authorize(context, roles)
    }

    try {
      return await resolver({ source, context, args })
    } catch (e) {
      context.logger.error(e)
      throw e
    }
  }
}

export function createMutation<TRet, TSource = unknown, TArgs = unknown>(
  roles: RoleName[],
  mutation: Resolver<TRet, TSource, TArgs>
) {
  return async (source: TSource, args: TArgs, context: Context) => {
    if (!_.isNil(roles) && !_.isEmpty(roles)) {
      authorize(context, roles)
    }
    try {
      return await mutation({ source, context, args })
    } catch (e) {
      context.logger.error(e)
      throw e
    }
  }
}

export function createLoader<T>(l: DataLoader.BatchLoadFn<number, T>) {
  return new DataLoader(l)
}
