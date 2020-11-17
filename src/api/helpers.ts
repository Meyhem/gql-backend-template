import DataLoader from 'dataloader'
import { Context } from '../context'

export interface Input<T> {
  input: T
}

export type ResolverConfig<TSource, TArgs> = {
  source: TSource
  args: TArgs
  context: Context
}
export type Resolver<TRet, TSource, TArgs> = (cfg: ResolverConfig<TSource, TArgs>) => TRet | Promise<TRet>

export function createResolver<TRet, TSource = unknown, TArgs = unknown>(resolver: Resolver<TRet, TSource, TArgs>) {
  return async (source: TSource, args: TArgs, context: Context) => {
    try {
      return await resolver({ source, context, args })
    } catch (e) {
      context.logger.error(e)
      throw e
    }
  }
}

export function createMutation<TRet, TSource = unknown, TArgs = unknown>(mutation: Resolver<TRet, TSource, TArgs>) {
  return async (source: TSource, args: TArgs, context: Context) => {
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
