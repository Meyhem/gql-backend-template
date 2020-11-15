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
  return (source: TSource, args: TArgs, context: Context) => resolver({ source, context, args })
}

export function createMutation<TRet, TSource = unknown, TArgs = unknown>(mutation: Resolver<TRet, TSource, TArgs>) {
  return (source: TSource, args: TArgs, context: Context) => mutation({ source, context, args })
}
