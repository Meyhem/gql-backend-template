import { createHash } from 'crypto'

export function hashPassword(password: string, salt: string) {
  const hasher = createHash('sha512')
  return hasher.update(salt + password).digest('base64')
}
