import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'

console.log('Bootstrapping...')

createConnection()
  .then(async connection => {
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.username = 'lalal tralala'
    user.isLocked = false
    await connection.manager.save(user)

    // const users = await connection.manager.find(User)
  })
  .catch(error => console.log(error))
