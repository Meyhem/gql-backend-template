import { Connection } from 'typeorm'
import { Role, RoleName } from './entity/Role'

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
}
