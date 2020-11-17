import _ from 'lodash'
import { Connection } from 'typeorm'
import { Post } from './entity/Post'
import { Role, RoleName } from './entity/Role'
import { User } from './entity/User'
import { hashPassword } from './features/user/utils'

export async function seedDb(c: Connection) {
  const roles = c.getRepository(Role)

  const requiredRoles: RoleName[] = ['Admin', 'Editor', 'Guest']

  for (const r of requiredRoles) {
    if (!(await roles.count({ where: { name: r } }))) {
      console.log(`Seeding role '${r}'`)
      const role = new Role()
      role.name = r
      await roles.insert(role)
    }
  }

  await seedMockData(c)
}

async function seedMockData(c: Connection) {
  // const users = c.getRepository(User)
  // const posts = c.getRepository(Post)
  const roles = c.getRepository(Role)

  await c.createQueryBuilder().delete().from(Post).execute()
  await c.createQueryBuilder().delete().from(User).execute()

  // await posts.delete(_.map(await posts.find(), 'id'))
  // await users.delete(_.map(await users.find(), 'id'))
  const adminRole = await roles.findOne({ name: 'Admin' })

  var data = _.map(_.times(3), i => {
    const u = new User()
    u.firstname = `Admin ${i}`
    u.lastname = `Admin ${i}`
    u.username = `admin${i}`
    u.salt = ''
    u.passwordHash = hashPassword(`admin${i}`, '')
    u.isLocked = false
    u.role = adminRole
    u.posts = _.map(_.times(5), pi => {
      const p = new Post()
      p.title = `Title ${pi}`
      p.createdAt = new Date()
      p.updatedAt = new Date()
      p.isPublished = true
      p.author = u
      return p
    })

    return u
  })

  const inserted = await c.manager.save(data)

  for (const u of data) {
    for (const p of u.posts) {
      await c.manager.save(p)
    }
  }
}
