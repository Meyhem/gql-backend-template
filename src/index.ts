import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer, IResolvers } from 'apollo-server'

import { seedDb } from './seed'
import { Context, createContext } from './context'
import { typeDefs } from './api/definition'
import { rootQuery } from './api/root-query'
import { rootMutation } from './api/root-mutation'

console.log('Bootstrapping...')

const resolvers: IResolvers<any, Context> = {
  Query: rootQuery,
  Mutation: rootMutation as any
}

createConnection()
  .then(async connection => {
    console.log('Db conn ok...')
    await seedDb(connection)

    const server = new ApolloServer({
      resolvers,
      typeDefs,
      introspection: true,
      playground: true,
      context: () => createContext(connection)
    })

    const info = await server.listen(process.env.PORT || 3000)
    console.log(`Server listening ${info.url}`)
  })
  .catch(error => console.log(error))
