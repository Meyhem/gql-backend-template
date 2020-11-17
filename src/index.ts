import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer, IResolvers } from 'apollo-server'
import { createLogger, format, transports } from 'winston'

import './config'
import { seedDb } from './seed'
import { Context, createContext } from './context'
import { typeDefs } from './api/definition'

import { query as userQuery, postsOfUserResolver } from './features/user/query'
import { query as postQuery } from './features/post/query'

import { mutation as userMutation } from './features/user/mutation'
import { mutation as postMutation } from './features/post/mutation'

console.log('Bootstrapping...')

const resolvers: IResolvers<any, Context> = {
  Query: {
    ...userQuery,
    ...postQuery
  },
  Mutation: {
    ...userMutation
    // ...postMutation
  },
  User: {
    posts: postsOfUserResolver
  }
}

createConnection()
  .then(async connection => {
    console.log('Db conn ok...')
    await seedDb(connection)
    var logger = createLogger({
      level: 'info',
      format: format.combine(format.colorize(), format.timestamp(), format.cli()),
      transports: [new transports.Console()]
    })

    const server = new ApolloServer({
      resolvers,
      typeDefs,
      introspection: true,
      playground: true,

      context: ctx => createContext(ctx.req, connection, logger)
    })

    const info = await server.listen(process.env.PORT || 3000)
    console.log(`Server listening ${info.url}`)
  })
  .catch(error => console.log(error))
